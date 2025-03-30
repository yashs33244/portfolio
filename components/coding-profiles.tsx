import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CodingProfiles() {
  return (
    <section className="py-12 border-t">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Coding Profiles</h2>
          <Button variant="outline" asChild>
            <Link href="/competitive">
              View detailed stats <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
                <Image src="/placeholder.svg?height=48&width=48" alt="LeetCode" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">LeetCode</h3>
                <Link
                  href="https://leetcode.com/u/yashs33244/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  @yashs33244
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">300+</div>
                <p className="text-sm text-muted-foreground">Problems Solved</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">15+</div>
                <p className="text-sm text-muted-foreground">Contests</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">1800+</div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Problem Difficulty</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Easy</span>
                    <span className="text-sm text-muted-foreground">100/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Medium</span>
                    <span className="text-sm text-muted-foreground">150/200</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Hard</span>
                    <span className="text-sm text-muted-foreground">50/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 relative">
                <Image src="/placeholder.svg?height=48&width=48" alt="Codeforces" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Codeforces</h3>
                <Link
                  href="https://codeforces.com/profile/yashs3324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  @yashs3324
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">20+</div>
                <p className="text-sm text-muted-foreground">Contests</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">1400+</div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div className="border rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">Specialist</div>
                <p className="text-sm text-muted-foreground">Rank</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Rating History</h4>
              <div className="aspect-[2/1] relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Codeforces Rating History"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

