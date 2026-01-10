export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center space-y-3">
          <p className="text-white/60 text-sm flex items-center justify-center gap-2">
            Built with
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-.5 17.93c-.61-.35-1.16-.83-1.61-1.4L15.54 12H8.41l9.61 7.93c-.61.35-1.22.61-1.88.8l-4.64-3.8z" />
              </svg>
              Next.js
            </span>
          </p>
          <p className="text-white/40 text-xs">
            © 2025 Gaurav Patil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
