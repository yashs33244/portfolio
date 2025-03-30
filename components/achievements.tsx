import { Trophy, Award, Medal } from "lucide-react"

export default function Achievements() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Achievements</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">4th Place in Premier College Hackathon</h3>
          </div>
          <p className="text-muted-foreground mb-2">Feb 2024</p>
          <p className="text-muted-foreground">
            Developed a secure HD crypto wallet with facial authentication, winning 4th place in the premier college
            hackathon.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Award className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">4th in AlgoUniversity Coding Contest</h3>
          </div>
          <p className="text-muted-foreground mb-2">Feb 2024</p>
          <p className="text-muted-foreground">
            Secured 4th place among college participants in the AlgoUniversity Coding Contest, winning a Rs. 2000 cash
            prize.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Medal className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">7th in College Hackathon</h3>
          </div>
          <p className="text-muted-foreground mb-2">Oct 2023</p>
          <p className="text-muted-foreground">
            Developed a Music Similarity Score generator with 97% accuracy, securing 7th place in the college Hackathon.
          </p>
        </div>
      </div>
    </section>
  )
}

