export const getKeyByLink = (link: string) => {
    return link.split(`${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET}/`)[1]
}