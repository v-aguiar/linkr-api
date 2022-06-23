import searchRepository from "../repositories/searchRepository.js";

export async function searchUser(req, res) {
  const { username } = req.params;

  try {
    const user = await searchRepository.fetchUser(username);

    if (user.rows.length === 0) {
      res.status(404).send("⚠ No user found with the given name!");
      return;
    }

    res.status(200).send(user.rows);
  } catch (err) {
    console.error("⚠ Error searching user on database! ", err);
    res.status(400).send("⚠ Error searching user on database!");
  }
}

export async function fetchUserById(req, res) {
  const { userId } = req.params;

  try {
    const user = await searchRepository.fetchUserById(userId);

    if (user.rows.length === 0) {
      res.status(404).send("⚠ No user found with the given id!");
      return;
    }

    res.status(200).send(user.rows[0]);
  } catch (err) {
    console.error("⚠ Error fetching user data from database! ", err);
    res.status(400).send("⚠ Error fetching user data from database!");
  }
}

export function fetchUserBySession(req, res) {
  const { user } = res.locals;

  delete user?.password;
  delete user?.createdAt;
  delete user?.imgUrl;
  res.status(200).send(user);
}
