export default function Impressum() {
  return (
    <div className="min-h-screen bg-apexBg text-white p-6 max-w-md mx-auto font-sans">
      <a href="/" className="text-apexRed text-xs font-bold mb-6 inline-block">&larr; Zurück zur App</a>
      
      <h1 className="text-xl font-black mb-4 border-b border-white/10 pb-2">IMPRESSUM</h1>
      
      <section className="space-y-4 text-xs text-gray-300">
        <div>
          <h2 className="font-bold text-white text-sm mb-1">Angaben gemäß § 5 DDG:</h2>
          <p>Manuel [Manuel Groh]</p>
          <p>[Bahnhofstraße 9]</p>
          <p>[73650 Winterbach]</p>
        </div>

        <div>
          <h2 className="font-bold text-white text-sm mb-1">Kontakt:</h2>
          <p>E-Mail: [magrohispo@gmail.com]</p>
        </div>

        <h1 className="text-xl font-black mt-8 mb-4 border-b border-white/10 pb-2">DATENSCHUTZERKLÄRUNG</h1>

        <div>
          <h2 className="font-bold text-white text-sm mb-1">1. Datenschutz auf einen Blick</h2>
          <p className="leading-relaxed">
            Diese Website dient als inoffizielles Fan-Tool. Es werden keine personenbezogenen Daten, Cookies oder Tracking-Tools von Seiten des Betreibers verwendet.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-white text-sm mb-1">2. Hosting durch Vercel</h2>
          <p className="leading-relaxed">
            Diese Website wird bei Vercel Inc. gehostet. Beim Aufrufen der Website erfasst Vercel automatisch Server-Logfiles (z. B. IP-Adresse, Browsertyp, Uhrzeit des Zugriffs). Dies ist technisch erforderlich, um die Bereitstellung und Sicherheit der Website zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </div>
      </section>
    </div>
  );
}