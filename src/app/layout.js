import "./globals.css";

export const metadata = {
  title: "Legend Synergy Lab - Comp & Counter Optimizer",
  description: "Berechne Synergien, Hard Counters und Map-Ratings für deine Squad-Comps.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-apexBg text-white antialiased">
        {children}
      </body>
    </html>
  );
}