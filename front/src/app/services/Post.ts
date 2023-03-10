export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  image: string;
  date: Date;
  tag: string;
  likeCount: number;
}

export interface PostCard {
  title: string;
  photo: string;
  id: string;
  author_id: string;
  author_photo: string;
  date: Date;
  tag: string;
  likeCount: number;
}

export interface PostRequest {
  author_id: string;
  title: string;
  content: string;
  image: string;
  date: Date;
  tag: string;
}

export interface LikeOrDislike {
  postId: string,
  like: boolean
}
