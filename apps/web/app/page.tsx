import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Aero</CardTitle>
          <CardDescription>
            Your Web3 application is ready to build
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Start building your decentralized application with Next.js, TypeScript, and Foundry.
          </p>
          <div className="flex gap-2">
            <Button variant="default">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}