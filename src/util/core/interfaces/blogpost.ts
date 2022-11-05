import Post from './post';

export default interface BlogPost extends Post {
  featured_image: string;
  slug: string;
}
