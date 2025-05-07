import { create } from "zustand";
import type { Post } from "@/types/post";

type PostStore = {
  myPosts: Post[];
  publicPosts: Post[];
  setMyPosts: (posts: Post[]) => void;
  setPublicPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
};

export const usePostStore = create<PostStore>((set, get) => ({
  myPosts: [],
  publicPosts: [],

  setMyPosts: (posts) => set({ myPosts: posts }),
  setPublicPosts: (posts) => set({ publicPosts: posts }),

  addPost: (post) => {
    const { myPosts } = get();
    set({ myPosts: [post, ...myPosts] });
  },

  updatePost: (updated) => {
    set((state) => ({
      myPosts: state.myPosts.map((p) => (p._id === updated._id ? updated : p)),
    }));
  },

  deletePost: (id) =>
    set((state) => ({
      myPosts: state.myPosts.filter((p) => p._id !== id),
    })),
}));
