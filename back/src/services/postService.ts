import {Post, PostModel} from "../models/Post.js";
import {PostRequest} from "../types/PostRequest.js";
import {UserModel} from "../models/User.js";
import {PopulatedPost, PostCard} from "../types/PostCard.js";

export async function createPost(post: PostRequest): Promise<Post> {
  const user = await UserModel.findById(post.author_id).exec();
  if (!user) {
    throw new Error('Invalid user id');
  }
  return await PostModel.create(post);
}

export async function getPostById(id: string): Promise<Post | null> {
  return await PostModel.findById(id).exec();
}

export async function getPosts(): Promise<Post[]> {
  return PostModel.find();
}

export async function deletePostById(id: string): Promise<boolean | null> {
  return PostModel.findByIdAndDelete(id);
}

export async function editPost(payload: Post): Promise<Post | null> {
  return PostModel.findByIdAndUpdate(payload._id, {content: payload.content, title: payload.title}, {new: true});
}

export async function getRecentPosts(): Promise<PostCard[]> {
  const populatedPosts = await PostModel.find<PopulatedPost>().populate('author_id').sort({_id: -1}).limit(6).exec();
  return mapToCards(populatedPosts);
}

export function mapToCards(posts: PopulatedPost[]): PostCard[] {
  const postCards: Set<PostCard> = new Set();
  posts.map(post => {
    const postCard: PostCard = {
      title: post.title,
      photo: post.image,
      id: post._id.toString(),
      author_id: post.author_id._id.toString(),
      author_photo: post.author_id.photo,
      date: post.date,
      tag: post.tag,
      likeCount: post.likeCount
    }
    postCards.add(postCard);
  });
  return Array.from(postCards);
}