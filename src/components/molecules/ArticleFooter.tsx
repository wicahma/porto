import Link from "next/link";

export default function ArticleFooter() {
  return (
    <footer className="border-t border-neutral-800/50 bg-neutral-950 mt-20">
      <div className="max-w-170 mx-auto px-6 py-12">
        <div className="text-center space-y-4">
          <p className="text-neutral-400 text-sm">
            Written with ❤️ by{" "}
            <span className="font-semibold text-white">Teguh</span>
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link href="/#about" className="hover:text-white transition-colors">
              About
            </Link>
            <span>•</span>
            <Link
              href="/#projects"
              className="hover:text-white transition-colors"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
