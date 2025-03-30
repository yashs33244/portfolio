import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="py-12 border-t">
      <div className="container">
        <div className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/blog">Read My Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

