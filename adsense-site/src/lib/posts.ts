import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
  readMinutes: number;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function listPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map((file) => {
      const source = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content } = matter(source);
      const stats = readingTime(content);
      return {
        slug: file.replace(/\.(md|mdx)$/i, ""),
        title: String(data.title ?? "Untitled"),
        description: String(
          data.description ?? content.slice(0, 160).replace(/\s+/g, " ")
        ),
        date: String(data.date ?? new Date().toISOString()),
        category: String(data.category ?? "General"),
        content,
        readMinutes: Math.max(1, Math.round(stats.minutes)),
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.md`);
  const fileMdx = path.join(postsDir, `${slug}.mdx`);
  const target = fs.existsSync(file) ? file : fs.existsSync(fileMdx) ? fileMdx : null;
  if (!target) return null;
  const source = fs.readFileSync(target, "utf8");
  const { data, content } = matter(source);
  const stats = readingTime(content);
  return {
    slug,
    title: String(data.title ?? "Untitled"),
    description: String(
      data.description ?? content.slice(0, 160).replace(/\s+/g, " ")
    ),
    date: String(data.date ?? new Date().toISOString()),
    category: String(data.category ?? "General"),
    content,
    readMinutes: Math.max(1, Math.round(stats.minutes)),
  } satisfies Post;
}
