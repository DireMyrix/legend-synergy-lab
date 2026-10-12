import "./globals.css";

export const metadata = {
  title: "ALGS Pro League Tracker",
  description: "Live ALGS Standings, Matchdays and Team Schedules",
  manifest: "/manifest.json",
  themeColor: "#FF2442",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body class="min-h-screen bg-apexDark text-white flex flex-col items-center">
        <div class="w-full max-w-md min-h-screen bg-apexDark flex flex-col justify-between border-x border-white/5">
          {children}
        </div>
      </body>
    </html>
  );
}