import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../lib/supabase";
import { Subtask } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subtask[] | { error: PostgrestError }>
) {
  const { id: taskId } = req.query;

  const { data: subtasks, error } = await supabase
    .from("subtasks")
    .select("*")
    .match({ taskId });

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(subtasks as Subtask[]);
  }
}
