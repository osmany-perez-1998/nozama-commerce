import { NextApiRequest, NextApiResponse } from "next";
import { UserPreview } from "../../../types/users";
import { PrismaClient } from "@prisma/client";
import { stringify } from "querystring";

const prisma = new PrismaClient();

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<UserPreview>
// ) {
//   const { username, password } = req.query;
//   if (username === "jmederos") {
//     res.status(400).end();
//   } else {
//     res.status(200).json({
//       username: username as string,
//       password: password as string,
//     });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPreview>
) {
  //To register, it is required name  username, email, password
  const { password, username, image } = req.body;

  const user = String(username);
  const passw = String(password);
  const img = String(image);

  try {
    const result = await prisma.user.create({
      data: { username: user, password: passw, image: img },
    });
    res.status(200).json({
      username: result.username,
      password: result.password,
      image: result.image,
    });
  } catch (Error) {
    res.status(400).end();
  }
}
