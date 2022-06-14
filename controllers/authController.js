import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user.rowCount) return res.status(401).send("login incorreto!");

    if (!bcrypt.compareSync(password, user.rows[0].password))
      return res.status(401).send("login incorreto!");

    const sessionId = (await sessionRepository.createSession(user.rows[0].id))
      .rows[0].id;

    const data = { sessionId };
    const config = { expiresIn: 60 * 60 * 12 };

    const token = jwt.sign(data, process.env.JWT_SECRET, config);
    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
