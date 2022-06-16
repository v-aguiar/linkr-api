import searchRepository from "../repositories/searchRepository.js";

export async function searchUser(req, res) {
  const { username } = req.body;

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
