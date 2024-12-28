import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, RefreshCcw } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300 p-4">
      <Card className="w-full max-w-md text-center border-2 border-pink-300 shadow-2xl">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <div
              className="animate-bounce w-28 h-28 bg-cover bg-center rounded-full border-4 border-white"
              style={{
                backgroundImage: "url('/logo.png')",
                backgroundPosition: 'center',
              }}
            />
          </div>
          <CardTitle className="text-5xl font-bold text-pink-600 drop-shadow-md">
            404 Nya~
          </CardTitle>
          <CardDescription className="text-purple-800 italic">
            Looks like this page got isekai&apos;d!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 font-semibold">
            The magical realm doesn&apos;t recognize this path. Want to return to the main quest?
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" className="bg-white hover:bg-pink-50 border-pink-300">
              <Link href="/" className="flex items-center gap-2 text-pink-600">
                <Home className="h-4 w-4" />
                Home Base
              </Link>
            </Button>
            <Button variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Respawn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
