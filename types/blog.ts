// types/blog.ts
export type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  cover?: string;   // url imagine
  date: string;     // ISO string
  tags?: string[];
};
