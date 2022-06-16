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
