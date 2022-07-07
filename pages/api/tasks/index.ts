import { PostgrestError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";
import { Task } from "../../../lib/types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Task[] | { error: PostgrestError }>
) {
  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    res.status(500).json({ error });
  } else {
    res.status(200).json(tasks as Task[]);
  }
}
