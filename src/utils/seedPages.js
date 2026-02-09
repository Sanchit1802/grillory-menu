import { menuData } from "../Data/MenuData";
import { supabase } from "../lib/supabase";

export const seedPages = async () => {
  const rows = menuData.map(p => ({
    title: p.PageTitle
  }));

  await supabase.from("pages").insert(rows);

  alert("Pages added!");
};