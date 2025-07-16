"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Flame, Key, Lightbulb, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HotTakesGenerator() {
  const [apiKey, setApiKey] = useState("")
  const [thoughts, setThoughts] = useState("")
  const [hotTakes, setHotTakes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [provider, setProvider] = useState("openai")

  const generateHotTakes = async () => {
    if (provider !== "ollama" && !apiKey.trim()) {
      setError(`Please enter your ${provider.toUpperCase()} API key`)
      return
    }

    if (!thoughts.trim()) {
      setError("Please enter your thoughts")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-hot-takes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          thoughts,
          provider,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate hot takes")
      }

      const data = await response.json()
      setHotTakes(data.hotTakes)
    } catch (err) {
      setError(
        "Failed to generate hot takes. Please check your API key and try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const clearAll = () => {
    setThoughts("")
    setHotTakes([])
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8 relative">
          {/* GitHub Link */}
          <div className="absolute top-0 right-0">
            <a
              href="https://github.com/Zoz24/hot-take-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-colors text-sm font-medium"
            >
              <img
                src="/github.svg"
                alt="GitHub"
                className="h-4 w-4 brightness-0 invert"
              />
              View on GitHub
            </a>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Flame className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Hot Takes Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your rambling thoughts into sharp, concise hot takes that
            cut straight to the point.
          </p>
        </div>

        {/* API Key Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
            <CardDescription>
              Select your provider and enter your API key to generate hot takes.
              Your key is only used for this session and never stored.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="ollama">Ollama (Local)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {provider !== "ollama" && (
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder={`Enter your ${provider.toUpperCase()} API key`}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Your Thoughts
            </CardTitle>
            <CardDescription>
              Share your thoughts, opinions, or ideas. The more context you
              provide, the better the hot takes will be.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="thoughts">What's on your mind?</Label>
              <Textarea
                id="thoughts"
                placeholder="I've been thinking about how social media has changed the way we communicate. It seems like everyone is trying to be witty and clever all the time, but maybe we're losing something deeper in the process..."
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                rows={6}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                onClick={generateHotTakes}
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Flame className="h-4 w-4 mr-2" />
                    Generate Hot Takes
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hotTakes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Your Hot Takes
              </CardTitle>
              <CardDescription>
                Here are your thoughts distilled into sharp, concise hot takes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hotTakes.map((hotTake, index) => (
                  <div key={index}>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500">
                      <p className="font-medium text-gray-900">{hotTake}</p>
                    </div>
                    {index < hotTakes.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pb-8">
          <p>Hot Take Generator • Your API key is never stored or shared</p>
        </div>
      </div>
    </div>
  )
}
