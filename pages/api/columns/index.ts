import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { Column } from "../../../lib/types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Column[] | { error: PostgrestError }>
) {
  const { data: columns, error } = await supabase.from("columns").select("*");

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(columns as Column[]);
  }
}
