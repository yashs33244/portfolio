import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutBrief() {
  return (
    <section className="py-12 border-t">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-4">
              I'm a passionate Fullstack Developer and Data Science Enthusiast from India, currently pursuing my
              Bachelor of Technology degree at Indian Institute of Information Technology Una.
            </p>
            <p className="text-muted-foreground mb-4">
              My journey in technology is driven by a deep curiosity and desire to build solutions that make a
              difference. I specialize in web development, cloud infrastructure, and competitive programming.
            </p>
            <p className="text-muted-foreground mb-6">
              Currently, I'm working as an intern at ViewR, an IIT Delhi startup, where I'm gaining valuable experience
              in AWS cloud infrastructure, Kubernetes CI/CD pipelines, and microservices deployment.
            </p>
            <Button variant="outline" asChild>
              <Link href="/about">
                Learn more about me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Education</h3>
              <p>Indian Institute of Information Technology Una</p>
              <p className="text-sm text-muted-foreground">Bachelor of Technology (2022-2026)</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Current Role</h3>
              <p>Intern at ViewR (IIT Delhi startup)</p>
              <p className="text-sm text-muted-foreground">Jan 2025 - March 2025</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Previous Role</h3>
              <p>Research Assistant at IIT Mandi</p>
              <p className="text-sm text-muted-foreground">May 2024 - Sept 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

