import { NextApiRequest, NextApiResponse } from "next";
import { UserPreview } from "../../../types/users";
import { PrismaClient } from "@prisma/client";
// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<UserPreview>
// ) {
//   const { username, password } = req.query;
//   if (username === "jmederos" && password === "jmederos") {
//     res.status(200).json({
//       username: username,
//       password: password,
//     });
//   } else {
//     res.status(401).end();
//   }
// }
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreview>
) {
  //To login is either username or email
  const { username, password } = req.query;

  const passw = String(password);
  const usern = String(username);

  const userByUsername = await prisma.user.findFirst({
    where: { username: usern },
  });

  if (userByUsername == null) {
    res.status(401).end();
  } else {
    if (passw === userByUsername.password) {
      res.status(200).json({
        username: userByUsername.username,
        password: userByUsername.password,
        image: userByUsername.image,
      });
    } else {
      console.error("password");
      res.status(401).end();
    }
  }
}
