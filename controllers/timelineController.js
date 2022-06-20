import { postOnTimelineRepository, getHashtagByName, insertHashtagsPost, createHashtag, handleLikeRepository, infoLikes } from "../repositories/timelineRepository.js";
import getMetadataUrl from "../utils/getMetadataUrl.js";

export async function getTimeline (req, res) {
    try {
        const { timelineQuery } = res.locals;
        const { userId } = res.locals.tokenData;
        const timeline = [];

        for (let i = 0; i < timelineQuery.length; i++) {
            const url = timelineQuery[i].url;
            delete timelineQuery[i].url;
            const metadata = await getMetadataUrl(url);

            timeline.push({
                ...timelineQuery[i],
                metadata: { ...metadata, url },
                infoLikes: await infoLikes( userId, timelineQuery[i].postId )
            });
        }

        res.status(200).send(timeline);

    } catch (e) {
        console.log("Error in getTimeline", e);
        res.sendStatus(500);    
    }
}

export async function postOnTimeline(req, res) {
    try {
        const { hashtags } = req.body;
        const { userId } = res.locals.tokenData;

        const postId = await postOnTimelineRepository( userId, req.body );
        let valuesToHashtagPost = "";

        if(!hashtags.length) {
            return res.sendStatus(201);
        }

        for(let i = 0; i < hashtags.length; i++) {
            let hashtagId = await getHashtagByName(hashtags[i]);
        
            valuesToHashtagPost += `(${postId}, ${hashtagId || await createHashtag(hashtags[i])})`;
            if(i !== hashtags.length - 1) {
            valuesToHashtagPost += ",";
            }
        }
  
        await insertHashtagsPost(valuesToHashtagPost);
  
        res.sendStatus(201);
  
        } catch (e) {
            console.log("Error in postOnTimeline", e);
            res.sendStatus(500);
    }
}

export async function handleLike(req, res) {
    try {
      const { liked } = req.body;
      const { userId } = res.locals.tokenData;
      const { id:postId } = req.params;
      
      if(!postId || isNaN(postId)) {
        return res.sendStatus(422);
      }
  
      const infoLikes = await handleLikeRepository(userId, postId, liked);
  
      res.status(200).send(infoLikes);
  
    } catch (e) {
      console.log("Error in handleLike", e);
      res.sendStatus(500);
    }
  }