import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { Board } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Board | {error: string}>
) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const collection = db.collection("boards");
  const id = req.query.id as string;

  try {
    const board = await collection.findOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(board as Board);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }

}
