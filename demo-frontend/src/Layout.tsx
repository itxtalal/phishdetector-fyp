import Logo from "./logo.png";
import HeroSection from "./components/HeroSection";
import FeatureGrid from "./components/FeatureGrid";
import TechnicalProcess from "./components/TechnicalProcess";

export default function () {
  return (
    <main className="bg-[#050505] text-white">
      <nav className="fixed top-0 w-full z-50 glass-card border-x-0 border-t-0 border-b-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="PhishDetector Logo" className="h-8" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-primary transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-primary transition-colors"
          >
            How it Works
          </a>
          <a href="#demo" className="hover:text-primary transition-colors">
            Live Demo
          </a>
        </div>
        <a
          href="https://github.com/itxtalal/phishdetector-fyp/releases/tag/v1.1"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
        >
          Get Extension
        </a>
      </nav>

      <HeroSection />

      <div id="features">
        <FeatureGrid />
      </div>

      <div id="how-it-works">
        <TechnicalProcess />
      </div>

      <section className="py-24 px-4 bg-background" id="demo">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-500 leading-tight">
              Interactive Demo
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Observe PhishDetector in action. Below are real-world URLs
              identified by our neural engine.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Malicious Vectors Identified
                  </h3>
                  <div className="space-y-4 font-mono text-sm">
                    {[
                      "https://amazon-ish.vercel.app/",
                      "https://am22fcu.firebaseapp.com/",
                      "http://an-bcna.weeblysite.com",
                      "http://apple.maps-auth.com",
                      "http://applitronix.com",
                      "http://att-106750107115.square.site",
                    ].map((url, i) => (
                      <div
                        key={url}
                        className="p-3 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 break-all hover:bg-red-500/10 transition-colors"
                      >
                        <a href={url} target="_blank" rel="noreferrer">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Safe Benchmarks
                  </h3>
                  <div className="space-y-4 font-mono text-sm">
                    {[
                      "https://google.com",
                      "https://www.github.com",
                      "https://github.dev",
                      "https://www.facebook.com",
                    ].map((url, i) => (
                      <div
                        key={url}
                        className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-primary break-all hover:bg-primary/10 transition-colors"
                      >
                        <a href={url} target="_blank" rel="noreferrer">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="glass-card p-8 rounded-3xl border-primary/20">
                <h3 className="text-2xl font-bold mb-6">Execution Preview</h3>
                <div className="aspect-video rounded-2xl overflow-hidden glass-card border-white/5">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/aNUeteA7FgU"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-4">Neural Feedback</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  "PhishDetector automatically highlights malicious links in red
                  on any webpage you visit, preventing accidental clicks before
                  the page even loads."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    PD
                  </div>
                  <div>
                    <div className="font-bold">System Architecture</div>
                    <div className="text-xs text-white/40">
                      Verified by ML Leads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-white/20 text-sm">
        <p>
          © 2026 PhishDetector Research Labs. All technical models proprietary.
        </p>
      </footer>
    </main>
  );
}
