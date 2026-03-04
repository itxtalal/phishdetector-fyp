import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v0.1 Engine Now Live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 leading-tight">
          Detect Phishing with <br />
          <span className="neon-text">Neural Intelligence</span>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop zero-day phishing attacks before they touch your network.
          PhishDetector analyzes 15+ structural and metadata vectors in
          real-time using advanced neural heuristic scanning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform shadow-lg shadow-primary/20">
            Launch Security Scan
          </button>
          <button className="px-8 py-4 rounded-xl glass-card border-white/10 hover:bg-white/5 transition-colors font-medium">
            Read Technical Whitepaper
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up">
          {[
            { label: "Accuracy", value: "99.4%" },
            { label: "Latancy", value: "<45ms" },
            { label: "Model", value: "Neural Net" },
            { label: "Features", value: "15 Vectors" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl">
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
