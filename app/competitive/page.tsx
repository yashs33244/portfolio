"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GithubStats from "@/components/github-stats";
import LeetcodeStats from "@/components/leetcode-stats";
import CodeforcesStats from "@/components/codeforces-stats";

export default function Competitive() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Competitive Programming</h1>
          <p className="text-gray-600">
            Checkout my competitive programming profiles and stats
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">GitHub Stats</h2>
            <GithubStats detailed={true} />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">LeetCode Stats</h2>
            <LeetcodeStats />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Codeforces Stats</h2>
            <CodeforcesStats />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">My Competitive Journey</h2>
            <div className="prose max-w-none">
              <p>
                My journey into competitive programming began during my first
                year of university. I've since participated in numerous coding
                contests and solved hundreds of problems across platforms.
              </p>
              <p>
                I find competitive programming to be an excellent way to improve
                problem-solving skills, algorithmic thinking, and coding
                efficiency. It has significantly contributed to my growth as a
                software engineer.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Notable Achievements</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Initiated two startups from bottom of the pyramid(ViewR,
                FinalCV)
              </li>
              <li>
                {" "}
                Ranked 4th in the largest hackathon in Una, Himachal, for
                building a secure HD crypto wallet.{" "}
              </li>
              <li>Solved 800+ problems across platforms</li>
              <li>Pupil rating on Codeforces</li>
              <li>Consistent participation in weekly contests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Resources I Recommend</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Data Structures & Algorithms</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <Link
                      href="https://cp-algorithms.com/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      CP Algorithms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.geeksforgeeks.org/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      GeeksforGeeks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://leetcode.com/explore/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      LeetCode Explore
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Practice Platforms</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <Link
                      href="https://leetcode.com/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      LeetCode
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://codeforces.com/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      Codeforces
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.hackerrank.com/"
                      className="text-blueviolet hover:underline"
                      target="_blank"
                    >
                      HackerRank
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              asChild
              className="border-rose text-rose hover:bg-rose hover:text-white"
            >
              <Link href="/projects">
                See My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
