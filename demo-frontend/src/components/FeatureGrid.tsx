import React from "react";

const features = [
  {
    title: "WHOIS Aging Intelligence",
    description:
      'Our engine identifies suspicious domains by analyzing registration timestamps and renewal patterns, flagging high-risk "fresh" domains.',
    icon: "🕒",
  },
  {
    title: "Structural Entropy Analysis",
    description:
      "Deep-parsing of URL anatomy, including length, character distribution, and obfuscation techniques used by attackers.",
    icon: "📊",
  },
  {
    title: "Neural Classification",
    description:
      "A 2-layer Neural Network optimized for real-time inference, classifying safety with human-level intuition and machine speed.",
    icon: "🧠",
  },
  {
    title: "SSL/TLS Validation",
    description:
      "Heuristic scanning of certificate chains and encryption standards to detect illegitimate or misconfigured secure layers.",
    icon: "🔒",
  },
  {
    title: "Domain Fingerprinting",
    description:
      "Mapping hostname patterns against known benign datasets to identify subtle variations and phishing clones.",
    icon: "👣",
  },
  {
    title: "Real-time Latency",
    description:
      "Optimized feature extraction reaching less than 50ms per scan, ensuring zero impact on user browsing experience.",
    icon: "⚡",
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Mastering the <span className="neon-text">Attack Vector</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Technical logic derived from exhaustive machine learning training on
            millions of malicious URLs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card p-8 rounded-3xl hover:border-primary/50 transition-all group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
