import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedPages = async () => {
  const rows = menuData.map((p, index) => ({
    title: p.PageTitle,
    sort_order: index + 1
  }));

  await supabase.from("pages").insert(rows);

  alert("Pages added!");
};