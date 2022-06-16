import likesRepository from "../repositories/likesRepository";

export async function fetchLikes(req, res) {
  const postId = req.params.postId;
  const userId = req?.query.userId;

  try {
    const likes = await likesRepository.fetchLikes(postId, userId);

    res.status(200).send({ likesData: likes.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("⚠ Couldn't fetch likes! ", err);
  }
}
