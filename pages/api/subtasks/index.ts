import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { Subtask, Task } from "../../../lib/types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Subtask[] | { error: PostgrestError }>
) {
  const { data: subtasks, error } = await supabase.from("subtasks").select("*");

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(subtasks as Subtask[]);
  }
}
