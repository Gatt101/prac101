import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9">
        <div className="text-center space-y-3">
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            Built with
            <span className="inline-flex items-center gap-1">
              <Code2 className="h-4 w-4" aria-hidden="true" />
              Next.js
            </span>
          </p>
          <p className="text-white/40 text-xs">
            © 2026 Gaurav Patil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
