
import { Header } from "@/components/navigation/header"

export default function Share() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div>
          <h1 className="text-3xl font-bold">Share Videos</h1>
          <p className="text-muted-foreground">Share your created videos on different platforms.</p>
        </div>
      </main>
    </div>
  )
}
