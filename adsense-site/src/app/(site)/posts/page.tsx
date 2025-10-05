import Link from "next/link";
import { listPosts } from "@/lib/posts";

export const metadata = {
  title: "All Posts",
  description: "Browse helpful guides across categories.",
};

export default function PostsPage() {
  const posts = listPosts();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Posts</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="card p-4">
            <div className="text-xs text-zinc-500 uppercase">{post.category}</div>
            <h2 className="mt-1 text-lg font-semibold">
              <a href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </a>
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {post.description}
            </p>
            <div className="mt-3 text-xs text-zinc-500">
              {new Date(post.date).toLocaleDateString()} • {post.readMinutes} min read
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
