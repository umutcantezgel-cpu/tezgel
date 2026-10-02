export function SkipNav() {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-orange-600 focus:px-4 focus:py-3 focus:font-bold focus:text-white focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-transform duration-200"
    >
      Zum Hauptinhalt springen
    </a>
  );
}

export default SkipNav;
