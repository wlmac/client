export default class Media {
  src: URL;
  type: MediaType;
  constructor(url: string, type: MediaType) {
    this.src = new URL(url);
    this.type = type;
  }
}

enum MediaType {
  video,
  image,
}
