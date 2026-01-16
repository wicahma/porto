import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article Not Found",
  description: "The article you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-300 mb-4">
          Article Not Found
        </h2>
        <p className="text-neutral-400 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
