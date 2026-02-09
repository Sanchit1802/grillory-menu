import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedItems = async () => {
  const rows = [];

  menuData.forEach(page => {
    page.sections.forEach(section => {
      section.items.forEach(item => {
        rows.push({
          section: section.title,
          name: item.name,
          price: item.price,
          special: item.special || false
        });
      });
    });
  });

  await supabase.from("items").insert(rows);

  alert("Items seeded!");
};
