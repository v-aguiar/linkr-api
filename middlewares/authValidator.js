import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.send(401).status("No token");
  }

  try {
    const { sessionId } = jwt.verify(token);

    const user = await userRepository.getUserBySessionId(sessionId);
    if (!user.rowCount) return res.status(401).send("user not found");

    res.locals.user = user.rows[0];
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("session not found");
  }
}
