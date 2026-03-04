import React from "react";

const steps = [
  {
    title: "URL Anatomy Pre-processing",
    body: "The engine strips the URL into hostname, path, and query parameters, extracting 15 distinct lexical features.",
    tag: "Step 1",
  },
  {
    title: "Heuristic Scoring",
    body: "Applying structural scoring based on character distribution, entropy, and length ratios against malicious archetypes.",
    tag: "Step 2",
  },
  {
    title: "Neural Inference",
    body: "Features are fed into a 2-layer Neural Network with 64 hidden units, returning a high-precision probability score.",
    tag: "Step 3",
  },
  {
    title: "Metadata Enrichment",
    body: "Verifying real-time data including WHOIS records and SSL certificate legitimacy for a holistic security verdict.",
    tag: "Step 4",
  },
];

const TechnicalProcess = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The <span className="neon-text">Machine Logic</span>
          </h2>
          <p className="text-white/40">
            From raw URL to security verdict in less than 50ms.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-colors"
            >
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-sm shrink-0">
                {step.tag}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalProcess;
