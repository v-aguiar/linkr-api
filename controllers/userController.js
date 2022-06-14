import userRepository from "../repositories/userRepository";

export async function createUser(req, res) {
  const user = req.body;

  try {
    const userExists = await userRepository.getUserByEmail(user.email);
    if (userExists.rowCount) {
      return res.status(409).send("email já cadastrado");
    }

    const { email, password, username, imgUrl } = user;
    await userRepository.createUser(email, password, username, imgUrl);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
