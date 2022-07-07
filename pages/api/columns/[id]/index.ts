import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../lib/supabase";
import { Column } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Column | { error: PostgrestError }>
) {
  const { id } = req.query;

  const { data: column, error } = await supabase
    .from("columns")
    .select("*")
    .match({ id })
    .single();

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(column as Column);
  }
}
