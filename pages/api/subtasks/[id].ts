import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import Subtask from "../../../lib/stores/subtask";
import supabase from "../../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subtask | { error: PostgrestError }>
) {
  const { id } = req.query;

  const { data: subtask, error } = await supabase
    .from("subtasks")
    .select("*")
    .match({ id })
    .single();

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(subtask as Subtask);
  }
}
