import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(200).json({ isAdmin: false });
  }

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const userEmail = session.user.email.toLowerCase();

  return res.status(200).json({ isAdmin: userEmail === adminEmail });
}
