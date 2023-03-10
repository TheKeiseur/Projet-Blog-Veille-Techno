export interface User {
  id: string;
  gender: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  photo: string;
  category: string;
  isAdmin: boolean;
  favoredPosts: string[];
}

export interface AddToFavoredRequest {
  postId: string,
  userId: string
  add: boolean
}
