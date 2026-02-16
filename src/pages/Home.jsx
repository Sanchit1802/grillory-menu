import Banner from "../components/Banner";
import PageSection from "../components/PageSection";
import TopNav from "../components/TopNav";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {

      // ✅ fetch ALL tables
      const { data: pages } = await supabase.from("pages").select("*").order("sort_order");
      const { data: sections } = await supabase.from("sections").select("*").order("sort_order");
      const { data: items } = await supabase.from("items").select("*").order("sort_order");

      if (!pages || !sections || !items) return;

      // ✅ build structure pages → sections → items
      const menu = pages.map(page => {

        // sections belonging to this page
        const pageSections = sections.filter(
          s => s.page_id === page.id
        );

        const finalSections = pageSections.map(sec => ({
          id: sec.title,
          title: sec.title,
          image: sec.image,
          items: items
            .filter(i => i.section === sec.title)
            .map(i => ({
              name: i.name,
              price: i.price,
              special: i.special,
            })),
            qtyNote: sec.qty_note
        }));

        return {
          PageTitle: page.title,
          sections: finalSections
        };
      });

      setMenuData(menu);
    };

    fetchMenu();
  }, []);


  return (
    <>
      <Banner />

      <div className="container">
        <TopNav sections={menuData.flatMap(page => page.sections)} />

        {menuData.map((page, index) => (
          <PageSection key={index} {...page} />
        ))}
      </div>

      <footer>
        <h2>Contact Us</h2>
        <p>Email: grilloryfood@gmail.com</p>
        <p>Mobile: 7055850243, 8958052628</p>
      </footer>
    </>
  );
}