import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPanel() {

  /* ================= STATES ================= */

  const [sections, setSections] = useState([]);
  const [items, setItems] = useState([]);

  const [editedItems, setEditedItems] = useState({});
  const [editedSections, setEditedSections] = useState({});
  const [pages, setPages] = useState([]);

  const [newSection, setNewSection] = useState({
    title: "",
    qtyNote: "",
    page_id: "",
    firstItem: "",
    firstPrice: ""
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
      price: newSection.firstPrice
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
    await supabase.from("items").delete().eq("section", title);
    await supabase.from("sections").delete().eq("title", title);
    fetchData();
  };

  /* ================= GROUP ================= */

  const grouped = {};
  items.forEach(i => {
    if (!grouped[i.section]) grouped[i.section] = [];
    grouped[i.section].push(i);
  });

  /* ================= UI ================= */

  return (
    <div style={{ padding: 40 }}>
      <h1>🔥 Grillory Admin</h1>

      {/* ADD SECTION */}
      <hr />
      <h2>Add Section (with first item)</h2>

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


      <input
        placeholder="Section name"
        value={newSection.title}
        onChange={e =>
          setNewSection({ ...newSection, title: e.target.value })
        }
      />

      <input
        placeholder="Qty Note"
        value={newSection.qtyNote}
        onChange={e =>
          setNewSection({ ...newSection, qtyNote: e.target.value })
        }
      />

      <input
        placeholder="First Item Name"
        value={newSection.firstItem}
        onChange={e =>
          setNewSection({ ...newSection, firstItem: e.target.value })
        }
      />

      <input
        placeholder="First Item Price"
        value={newSection.firstPrice}
        onChange={e =>
          setNewSection({ ...newSection, firstPrice: e.target.value })
        }
      />

      <input type="file" ref={fileRef} accept="image/*" />

      <button onClick={addSection}>➕ Add Section</button>


      {/* EDIT */}
      <hr />
      <h2>Edit Menu</h2>

      {sections.map(sec => (
        <div key={sec.id} style={{ marginBottom: 20 }}>
          <h3>{sec.title}</h3>

          <input
            defaultValue={sec.qty_note}
            onChange={e =>
              handleSectionChange(sec.id, "qty_note", e.target.value)
            }
          />

          <button onClick={() => deleteSection(sec.title)}>❌ Delete Section</button>

          {grouped[sec.title]?.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 10 }}>
              <input
                defaultValue={item.name}
                onChange={e =>
                  handleItemChange(item.id, "name", e.target.value)
                }
              />

              <input
                defaultValue={item.price}
                onChange={e =>
                  handleItemChange(item.id, "price", e.target.value)
                }
              />

              <button onClick={() => deleteItem(item.id)}>❌</button>
            </div>
          ))}
        </div>
      ))}

      <hr />

      {/* SAVE BUTTON */}
      <button
        onClick={saveChanges}
        style={{
          padding: 10,
          fontSize: 16,
          background: "green",
          color: "white"
        }}
      >
        💾 Update Changes
      </button>
    </div>
  );
}
