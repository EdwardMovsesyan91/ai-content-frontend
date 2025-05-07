export interface Post {
  _id: string;
  title: string;
  content: string;
  isDraft: boolean;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
