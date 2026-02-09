import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedSections = async () => {
  const { data: pages } = await supabase.from("pages").select("*");

  const pageMap = {};
  pages.forEach(p => pageMap[p.title] = p.id);

  const rows = [];

  menuData.forEach(page => {
    page.sections.forEach(section => {
      rows.push({
        title: section.title,
        image: section.image,
        qty_note: section.qtyNote || null, // ✅ add this
        page_id: pageMap[page.PageTitle]
      });
    });
  });

  await supabase.from("sections").insert(rows);

  alert("Sections seeded with qtyNote!");
};