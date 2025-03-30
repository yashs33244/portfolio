export default function Timeline() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Professional Timeline</h2>
      <div className="relative border-l border-muted-foreground/20 pl-6 ml-3">
        <div className="mb-10 relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1.5 border-4 border-background"></div>
          <div className="mb-1">
            <span className="font-medium">Intern at ViewR (IIT Delhi startup)</span>
            <span className="text-sm text-muted-foreground ml-2">Jan 2025 - March 2025</span>
          </div>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>AWS cloud infrastructure with multi-region deployment</li>
            <li>Kubernetes CI/CD pipelines development</li>
            <li>Scalable backend engineering with rate limiting</li>
            <li>Microservices deployment with Helm charts</li>
          </ul>
        </div>

        <div className="mb-10 relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1.5 border-4 border-background"></div>
          <div className="mb-1">
            <span className="font-medium">Research Assistant at IIT Mandi</span>
            <span className="text-sm text-muted-foreground ml-2">May 2024 - Sept 2024</span>
          </div>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Continuous authentication system for banking apps</li>
            <li>Research on compound olfaction using GNNs</li>
            <li>MPNN enhancement for compound analysis</li>
            <li>Transformer model refinement for NLP tasks</li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1.5 border-4 border-background"></div>
          <div className="mb-1">
            <span className="font-medium">Started B.Tech at IIIT Una</span>
            <span className="text-sm text-muted-foreground ml-2">Oct 2022</span>
          </div>
          <p className="text-muted-foreground">Began Bachelor of Technology degree with focus on Computer Science</p>
        </div>
      </div>
    </section>
  )
}

