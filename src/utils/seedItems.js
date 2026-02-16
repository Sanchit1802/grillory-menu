import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedItems = async () => {
  const rows = [];

  menuData.forEach(page => {
    page.sections.forEach(section => {
      section.items.forEach((item, iIndex) => {
        rows.push({
          section: section.title,
          name: item.name,
          price: item.price,
          special: item.special || false,
          sort_order: iIndex + 1
        });
      });
    });
  });

  await supabase.from("items").insert(rows);

  alert("Items seeded!");
};
