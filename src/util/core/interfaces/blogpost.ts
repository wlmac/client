import Post from './post';

export default interface BlogPost extends Post {
  featuredImage: URL;
  slug: string;
}
