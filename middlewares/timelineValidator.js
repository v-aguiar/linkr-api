import { getTimelineRepository, postOnTimelineRepository } from "../repositories/timelineRepository.js";

export async function getTimelineValidator(req, res, next) {
    try {
        const timeline = await getTimelineRepository();
        res.locals.timelineQuery = timeline;
        next();
    } catch (e) {
        console.log("Error in getTimelineValidator", e);
        res.sendStatus(500);
    }
}

export async function createPostValidator(req, res, next) {
    try {
        next();
    } catch (e) {
        console.log("Error in createPostValidator", e);
        res.sendStatus(500);
    }
}