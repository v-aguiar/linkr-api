import urlExist from "url-exist";
import urlMetadata from "url-metadata";

export async function validateUrl(req, res, next) {
    const { url } = req.body;

    if (!(await urlExist(url))) res.sendStatus(404);

    try {
        const metadata = await urlMetadata(url);

        res.locals.metadata = metadata;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
