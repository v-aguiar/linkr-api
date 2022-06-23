import friendsRepository from "../repositories/friendsRepository.js";

export async function fetchFriends(req, res) {
  const { userId } = req.params;
  const { user } = res.locals;

  try {
    const friends = await friendsRepository.fetchFriends(userId);

    const friendsResponse = {
      friends: friends.rows,
      count: friends.rows.length,
      userId: user.userId,
    };

    res.status(200).send(friendsResponse);
  } catch (err) {
    console.error("⚠ Couldn't fetch friends!");
    res.status(500).send("⚠ Couldn't fetch friends!");
  }
}

export async function follow(req, res) {
  const { userId, friendId } = req.body;

  try {
    await friendsRepository.follow(userId, friendId);

    res.status(200).send("✅ Followed!");
  } catch (err) {
    console.error("⚠ Error on follow!", err);
    res.status(500).send("⚠ Error on follow!");
  }
}

export async function unfollow(req, res) {
  const { userId, friendId } = req.body;

  try {
    await friendsRepository.unfollow(userId, friendId);

    res.status(200).send("✅ Unfollowed!");
  } catch (err) {
    console.error("⚠ Error on unfollow!", err);
    res.status(500).send("⚠ Error on unfollow!");
  }
}
