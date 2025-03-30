import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Hi, I'm <span className="text-blueviolet">Yash Singh</span>
          </h1>
          <p className="text-xl text-gray-600">
            Passionate Fullstack Developer and Software Engineer
          </p>
          <p className="text-gray-600">
            Currently working at ViewR, an IIT Delhi startup, building scalable
            cloud infrastructure and microservices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-rose hover:bg-rose-600 text-white">
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-azure text-azure hover:bg-azure hover:text-white"
            >
              <Link
                href="https://drive.google.com/file/d/117KGPqnxCYgZ-tvHkL65yx9cbG3jv5AZ/view"
                target="_blank"
              >
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Link>
            </Button>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/yashs33244/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-azure transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/yash-singh-2757aa1b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-azure transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <Image
              src="/images/profile.jpeg"
              alt="Yash Singh"
              fill
              className="object-cover border-4 border-amber shadow-lg object-top brightness-125"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
