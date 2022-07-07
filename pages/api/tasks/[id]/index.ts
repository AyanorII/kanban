import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../../lib/supabase";
import { Task } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | { error: PostgrestError }>
) {
  const {id} = req.query

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .match({ id })
    .single();

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(task as Task);
  }
}
