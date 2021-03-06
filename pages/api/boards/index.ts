import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { Board } from "../../../lib/types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Board[] | { error: PostgrestError }>
) {
  const { data: boards, error } = await supabase.from("boards").select("*");

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(boards);
  }
}
