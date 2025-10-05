import Link from "next/link";
import { ArrowRight, PenSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Fresh guides for Nigerians
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Practical how‑tos on mobile data, payments, business, and tech. Short,
          clear, and optimized for small screens and slow networks.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="card p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">How‑To</div>
              <h2 className="mt-1 text-lg font-semibold">
                <Link href={`/posts/sample-${i}`} className="hover:underline">
                  Sample Post Title {i}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                Learn step‑by‑step how to complete this useful task in Nigeria.
              </p>
              <div className="mt-3">
                <Link href={`/posts/sample-${i}`} className="btn btn-outline text-sm">
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card p-4">
          <h3 className="font-semibold flex items-center gap-2">
            <PenSquare className="h-4 w-4" /> Popular Topics
          </h3>
          <ul className="mt-2 text-sm space-y-2">
            {[
              ["Mobile Data", "/category/data"],
              ["Payments", "/category/payments"],
              ["Side Hustles", "/category/hustles"],
              ["Device Tips", "/category/devices"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Newsletter</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Get 1–2 helpful posts weekly.
          </p>
          <form className="mt-3 space-y-2">
            <input
              type="email"
              className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
              placeholder="you@example.com"
              aria-label="Email"
            />
            <button type="submit" className="btn btn-primary w-full text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
