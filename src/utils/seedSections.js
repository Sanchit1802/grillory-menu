import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedSections = async () => {
  const { data: pages } = await supabase.from("pages").select("*");

  const pageMap = {};
  pages.forEach(p => pageMap[p.title] = p.id);

  const rows = [];

  menuData.forEach(page => {
    page.sections.forEach((section, sIndex) => {
      rows.push({
        title: section.title,
        qty_note: section.qtyNote || null,
        page_id: pageMap[page.PageTitle],
        sort_order: sIndex + 1
      });
    });
  });

  await supabase.from("sections").insert(rows);

  alert("Sections seeded with qtyNote!");
};