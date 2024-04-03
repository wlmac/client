export const cleanUrl = (url: string | undefined): string | undefined => {
    return url?.replace("http://", "https://")
}