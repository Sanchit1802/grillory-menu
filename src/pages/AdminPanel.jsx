import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import TopNav from "../components/TopNav";


export default function AdminPanel() {

  /* ================= STATES ================= */

  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);

  const [editedItems, setEditedItems] = useState({});
  const [editedSections, setEditedSections] = useState({});
  const [pages, setPages] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  // per-section new item inputs keyed by section id
  const [newItem, setNewItem] = useState({});

  const [newSection, setNewSection] = useState({
    title: "",
    qtyNote: "",
    page_id: "",
    firstItem: "",
    firstPrice: "",
    special: false
  });

  const fileRef = useRef();


  /* ================= FETCH ================= */


  const fetchData = async () => {
    const { data: p } = await supabase.from("pages").select("*");
    const { data: s } = await supabase.from("sections").select("*");
    const { data: i } = await supabase.from("items").select("*");

    setPages(p || []);
    setSections(s || []);
    setItems(i || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= STORAGE ================= */

  const uploadImage = async (file) => {
    const name = Date.now() + "-" + file.name;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(name, file);

    if (error) {
      console.error(error);
      alert("Upload failed: " + error.message);
      return "";
    }

    return supabase.storage
      .from("menu-images")
      .getPublicUrl(name).data.publicUrl;
  };


  /* ================= SECTION ADD ================= */

  const addSection = async () => {

    const file = fileRef.current?.files?.[0];

    if (!newSection.title || !newSection.firstItem || !newSection.firstPrice || !newSection.page_id) {
      alert("Fill section name + first item + price + page");
      return;
    }

    let imageUrl = "";

    // upload only if image selected
    if (file) {
      imageUrl = await uploadImage(file);
    }

    const { error: sectionError } = await supabase.from("sections").insert({
      title: newSection.title,
      qty_note: newSection.qtyNote,
      image: imageUrl,
      page_id: newSection.page_id
    });

    if (sectionError) {
      alert(sectionError.message);
      return;
    }

    await supabase.from("items").insert({
      section: newSection.title,
      name: newSection.firstItem,
      price: newSection.firstPrice,
      special: newSection.special
    });

    // reset
    setNewSection({
      title: "",
      qtyNote: "",
      firstItem: "",
      firstPrice: "",
      page_id: ""
    });

    fileRef.current.value = "";

    fetchData();
  };


  /* ================= LOCAL EDIT ================= */

  const handleItemChange = (id, field, value) => {
    setEditedItems(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleSectionChange = (id, field, value) => {
    setEditedSections(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  /* ================= SAVE ALL ================= */

  const saveChanges = async () => {

    // update items
    for (const id in editedItems) {
      await supabase.from("items").update(editedItems[id]).eq("id", id);
    }

    // update sections
    for (const id in editedSections) {
      await supabase.from("sections").update(editedSections[id]).eq("id", id);
    }

    setEditedItems({});
    setEditedSections({});

    alert("Updated successfully!");

    fetchData();
  };

  /* ================= DELETE ================= */

  const deleteItem = async (id) => {
    await supabase.from("items").delete().eq("id", id);
    fetchData();
  };

  const deleteSection = async (title) => {
    const ok = window.confirm(
      `Are you sure you want to delete the section "${title}"?\nAll items inside it will also be deleted.`
    );

    if (!ok) return;

    // Find the section to get the image URL
    const section = sections.find(s => s.title === title);

    // Delete image from storage if it exists
    if (section && section.image) {
      const imageName = section.image.split('/').pop(); // Extract filename from URL
      await supabase.storage.from("menu-images").remove([imageName]);
    }

    await supabase.from("items").delete().eq("section", title);
    await supabase.from("sections").delete().eq("title", title);

    fetchData();
  };

  const addItem = async (sectionId, sectionTitle) => {
    const sectionNewItem = newItem[sectionId] || {};

    if (!sectionNewItem.name || !sectionNewItem.price) {
      alert("Fill item name and price");
      return;
    }

    const { error } = await supabase.from("items").insert({
      section: sectionTitle,
      name: sectionNewItem.name,
      price: sectionNewItem.price,
      special: sectionNewItem.special || false
    });

    if (error) {
      alert(error.message);
      return;
    }

    // clear only this section's inputs
    setNewItem(prev => ({ ...prev, [sectionId]: { name: "", price: "", special: false } }));

    fetchData();
  };


  /* ================= GROUP ================= */

  const grouped = {};
  items.forEach(i => {
    if (!grouped[i.section]) grouped[i.section] = [];
    grouped[i.section].push(i);
  });

  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/admin-login", { replace: true });
        return;
      }

      setCheckingAuth(false);
    };

    checkLogin();
  }, [navigate]);

  if (checkingAuth) return null;

  /* ================= UI ================= */

  return (
    <>
      <Banner />
      <div style={{ padding: 40}}>
        <h1>Add Section</h1>

        <select
          value={newSection.page_id}
          onChange={e =>
            setNewSection({ ...newSection, page_id: e.target.value })
          }
        >
          <option value="">Select Page</option>

          {pages.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
        <br />

        <input
          placeholder="Section name"
          value={newSection.title}
          onChange={e =>
            setNewSection({ ...newSection, title: e.target.value })
          }
        />
        <br />

        <input
          placeholder="Qty Note"
          value={newSection.qtyNote}
          onChange={e =>
            setNewSection({ ...newSection, qtyNote: e.target.value })
          }
        />

        <br />

        <input
          placeholder="First Item Name"
          value={newSection.firstItem}
          onChange={e =>
            setNewSection({ ...newSection, firstItem: e.target.value })
          }
        />

        <br />

        <input
          placeholder="First Item Price"
          value={newSection.firstPrice}
          onChange={e =>
            setNewSection({ ...newSection, firstPrice: e.target.value })
          }
        />

        <br />
        <input type="checkbox"
          className="check-box"
          checked={newSection.special}
          onChange={e =>
            setNewSection({ ...newSection, special: e.target.checked })
          }
        /> Special
        <br />

        <input type="file" ref={fileRef} accept="image/*" />

        <button style={{ marginTop: 10 }} onClick={addSection}>➕ Add Section</button>


        {/* EDIT */}
        <hr />
        <TopNav sections={sections} />
        <br />
        <h1>Edit Menu</h1>

        {sections.map(sec => (
          <div key={sec.id} id={sec.id}>
            <h1 style={{ marginBottom: 10 }}>{sec.title}</h1>

            <button onClick={() => deleteSection(sec.title)}>❌ Delete Section</button>
            <br />

            <input
              style={{ marginBottom: 20 }}
              placeholder="Qty note"
              defaultValue={sec.qty_note}
              onChange={e =>
                handleSectionChange(sec.id, "qty_note", e.target.value)
              }
            />


            {grouped[sec.title]?.map(item => (
              <div className="item-container" key={item.id} >
                <input
                  className="name-input"
                  defaultValue={item.name}
                  onChange={e =>
                    handleItemChange(item.id, "name", e.target.value)
                  }
                />
                <br />

                <input
                  className="price-input"
                  defaultValue={item.price}
                  onChange={e =>
                    handleItemChange(item.id, "price", e.target.value)
                  }
                />
                <br />
                <input
                  className="check-box"
                  type="checkbox"
                  defaultChecked={item.special}
                  onChange={e =>
                    handleItemChange(item.id, "special", e.target.checked)
                  }
                /> Special
                <br />

                <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete Item</button>
              </div>
            ))}

            <div className="item-container" style={{ background: "#d67d0043" }} >
              <input
                className="name-input"
                placeholder="New item name"
                value={newItem[sec.id]?.name || ""}
                onChange={e =>
                  setNewItem(prev => ({ ...prev, [sec.id]: { ...prev[sec.id], name: e.target.value } }))
                }
              />
              <br />
              <input
                className="price-input"
                placeholder="New item price"
                value={newItem[sec.id]?.price || ""}
                onChange={e =>
                  setNewItem(prev => ({ ...prev, [sec.id]: { ...prev[sec.id], price: e.target.value } }))
                }
              />
              <br />
              <input
                className="check-box"
                type="checkbox"
                checked={!!newItem[sec.id]?.special}
                onChange={e =>
                  setNewItem(prev => ({ ...prev, [sec.id]: { ...prev[sec.id], special: e.target.checked } }))
                }
              /> Special
              <br />
              <button style={{ backgroundColor: "green", color: "white", marginTop: 10 }} onClick={() => addItem(sec.id, sec.title)}>+ Add Item</button>
            </div>
            <hr />
            <hr />
          </div>
        ))}


        {/* SAVE BUTTON */}
        <button
          className="save-button"
          onClick={saveChanges}
          style={{
            position: "fixed",
            right: 50,
            bottom: 20,
            zIndex: 100,
            background: "green",
            color: "white",
            marginBottom: 50,
          }}
        >
          + Save
        </button>
      </div>
      <footer>
        <h2>Contact Us</h2>
        <p>Email: grilloryfood@gmail.com</p>
        <p>Mobile: 7055850243, 8958052628</p>
      </footer>
    </>
  );
}
