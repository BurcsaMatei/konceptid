// components/sections/ArticlesPreview.tsx
import Link from "next/link";
import { motion } from "framer-motion";

import Grid from "../Grid";
import BlogCard from "../blog/BlogCard";
import type { Post } from "../../types/blog";
import type { BlogPostLite } from "../../lib/blogData";

import {
  sectionClass,
  headerClass,
  titleClass,
  subtitleClass,
  gridClass,
  ctaRowClass,
  emptyClass,
} from "../../styles/articlesPreview.css";
import Button from "../../components/Button";

type Props = {
  posts: BlogPostLite[];
  title?: string;
  subtitle?: string;
  showCta?: boolean;
};

const adaptToPost = (p: BlogPostLite): Post => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  cover: p.coverImage ?? undefined,
  date: p.date,
  tags: p.tags,
});

export default function ArticlesPreview({
  posts,
  title = "Articole recente",
  subtitle = "Noutăți și ghiduri scurte.",
  showCta = true,
}: Props) {
  const hasPosts = Array.isArray(posts) && posts.length > 0;

  return (
    <section className={sectionClass} aria-labelledby="articles-preview-title">
      <div className={headerClass}>
        <h2 id="articles-preview-title" className={titleClass}>
          {title}
        </h2>
        <p className={subtitleClass}>{subtitle}</p>
      </div>

      {!hasPosts ? (
        <div className={emptyClass}>Nu avem încă articole publice. Revino curând.</div>
      ) : (
        <>
          <Grid cols={{ base: 1, sm: 2, lg: 3 }} gap="20px" className={gridClass}>
            {posts.map((p) => {
              const post = adaptToPost(p);
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              );
            })}
          </Grid>

          {showCta && (
            <div className={ctaRowClass}>
              <Button>
                <Link href="/blog">Vezi toate articolele →</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
