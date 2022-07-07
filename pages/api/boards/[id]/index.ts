import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../lib/supabase";
import { Board } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board | { error: PostgrestError }>
) {
  const { id } = req.query;

  const { data: board, error } = await supabase
    .from("boards")
    .select("*")
    .match({ id })
    .single();

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(board as Board);
  }
}
