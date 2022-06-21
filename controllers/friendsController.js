import friendsRepository from "../repositories/friendsRepository.js";

export async function fetchFriends(req, res) {
  const { userId } = req.params;

  try {
    const friends = await friendsRepository.fetchFriends(userId);

    const friendsResponse = {
      friends: friends.rows,
      count: friends.rows.length,
    };

    res.status(200).send(friendsResponse);
  } catch (err) {
    console.error("⚠ Couldn't fetch friends!");
    res.status(500).send("⚠ Couldn't fetch friends!");
  }
}
