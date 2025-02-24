export type Post = {
  imageUrl: string;
  title: string;
  author: {
    name: string;
    picture: string;
  };
  date: string;
  readTime: number;
  body: string;
  views: number;
  likes: number;
  comments: number;
};
