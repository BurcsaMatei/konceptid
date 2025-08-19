// components/blog/BlogCard.tsx
import Card from "../Card";
import { Post } from "../../types/blog";
import { formatDateRo } from "../../lib/dates"; // asigură un helper ro-RO
import Img from "../ui/Img";

type Props = {
  post: Post;
  basePath?: string;     // default: /blog
};

export default function BlogCard({ post, basePath = "/blog" }: Props) {
  const href = `${basePath}/${post.slug}`;
  const meta = (
    <>
      <time dateTime={post.date}>{formatDateRo(post.date)}</time>
      {post.tags?.length ? <span>• {post.tags[0]}</span> : null}
    </>
  );

  return (
    <Card
      title={post.title}
      href={href}
      meta={meta}
      excerpt={post.excerpt}
      image={
        post.cover
          ? { src: post.cover, alt: post.title }
          : undefined
      }
    />
  );
}
