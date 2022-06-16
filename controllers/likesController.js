import likesRepository from "../repositories/likesRepository.js";

export async function fetchLikes(req, res) {
  const postId = req.params.postId;
  const userId = req?.query.userId;

  try {
    const likes = await likesRepository.fetchLikes(postId, userId);

    res.status(200).send(likes.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠ Couldn't fetch likes! ");
  }
}

export async function fetchWhoLiked(req, res) {
  const { postId } = req.params;
  const { userId } = req.params;

  try {
    const whoLiked = await likesRepository.fetchWhoElseLiked(postId, userId);

    res.status(200).send(whoLiked.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠ Couldn't fetch who liked! ");
  }
}
