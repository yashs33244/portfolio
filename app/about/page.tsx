import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Timeline from "@/components/timeline";
import SkillsDetailed from "@/components/skills-detailed";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          <div className="col-span-1">
            <div className="sticky top-20">
              <Image
                src="/images/profile.jpeg"
                alt="Yash Singh"
                width={400}
                height={400}
                className="rounded-lg mb-4 border border-muted shadow-md brightness-125"
              />
              <Button className="w-full mb-2 " asChild>
                <Link href="https://drive.google.com/file/d/117KGPqnxCYgZ-tvHkL65yx9cbG3jv5AZ/view">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Professional Bio</h2>
              <p className="text-muted-foreground mb-4">
                I'm a passionate Fullstack Developer and Data Science Enthusiast
                from India, currently pursuing my Bachelor of Technology degree
                at Indian Institute of Information Technology Una. My journey in
                technology is driven by a deep curiosity and desire to build
                solutions that make a difference.
              </p>
              <p className="text-muted-foreground mb-4">
                Currently, I'm working as an intern at ViewR, an IIT Delhi
                startup, where I'm gaining valuable experience in AWS cloud
                infrastructure, Kubernetes CI/CD pipelines, and microservices
                deployment. Previously, I worked as a Research Assistant at IIT
                Mandi, focusing on continuous authentication systems and
                compound olfaction using Graph Neural Networks.
              </p>
              <p className="text-muted-foreground">
                My technical expertise spans across frontend and backend
                development, with a growing interest in DevOps and Data Science.
                I'm particularly passionate about competitive programming and
                problem-solving, regularly participating in contests on
                platforms like LeetCode and Codeforces.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium">
                  Indian Institute of Information Technology Una
                </h3>
                <p className="text-sm text-muted-foreground">
                  Oct 2022 - July 2026
                </p>
                <p className="mt-2">Bachelor of Technology</p>
                <p className="text-muted-foreground">GPA: 8.3/10.0</p>
                <p className="mt-2 text-muted-foreground">
                  Key coursework: Data Structures & Algorithms, Database
                  Management Systems, Computer Networks, Machine Learning
                </p>
              </div>
            </section>

            <Timeline />

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Personal Interests
              </h2>
              <p className="text-muted-foreground mb-4">
                Beyond coding, I enjoy exploring new technologies, participating
                in hackathons, and contributing to open-source projects. I'm
                also interested in financial markets and enjoy reading about
                economics and technology trends.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Fun Fact</h3>
                <p className="text-muted-foreground">
                  I once debugged a production issue while on a 12-hour train
                  journey with spotty internet connection!
                </p>
              </div>
            </section>
          </div>
        </div>

        <SkillsDetailed />
      </div>
      <Footer />
    </>
  );
}
