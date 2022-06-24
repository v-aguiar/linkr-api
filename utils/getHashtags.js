export default function getHashtags(text) {
    const regex = /#\w+/g;

    let arrHashtag = text.match(regex)?.map((hashtag) => hashtag.split("#")[1]);
    return arrHashtag;
}
