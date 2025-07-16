import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { ollama } from "ollama-ai-provider"

export async function POST(req: NextRequest) {
  try {
    const { apiKey, thoughts, provider } = await req.json()

    if (!thoughts || !provider) {
      return NextResponse.json(
        { error: "Thoughts and provider are required" },
        { status: 400 }
      )
    }

    let model

    switch (provider) {
      case "openai":
        if (!apiKey) {
          return NextResponse.json(
            { error: "API key is required for OpenAI" },
            { status: 400 }
          )
        }
        const openai = createOpenAI({ apiKey })
        model = openai("gpt-4o-mini")
        break
      case "anthropic":
        if (!apiKey) {
          return NextResponse.json(
            { error: "API key is required for Anthropic" },
            { status: 400 }
          )
        }
        const anthropic = createAnthropic({ apiKey })
        model = anthropic("claude-3-haiku-20240307")
        break
      case "google":
        if (!apiKey) {
          return NextResponse.json(
            { error: "API key is required for Google" },
            { status: 400 }
          )
        }
        const google = createGoogleGenerativeAI({ apiKey })
        model = google("models/gemini-1.5-flash")
        break
      case "ollama":
        model = ollama("llama3")
        break
      default:
        return NextResponse.json(
          { error: "Unsupported provider" },
          { status: 400 }
        )
    }

    const { text } = await generateText({
      model: model,
      prompt: `Transform the following thoughts into 3-5 concise, sharp "hot takes" - bold, controversial, or provocative statements that capture the essence of the original thoughts. Each hot take should be:
      - One sentence long
      - Direct and punchy
      - Thought-provoking or slightly controversial
      - Capture the core insight from the original thoughts
      
      Original thoughts: "${thoughts}"
      
      Format your response as a numbered list of hot takes, one per line.`
    })

    // Parse the response to extract individual hot takes
    const hotTakes = text
      .split("\n")
      .filter((line) => line.trim() && /^\d+\./.test(line.trim()))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter((take) => take.length > 0)

    return NextResponse.json({ hotTakes })
  } catch (error) {
    console.error("Error generating hot takes:", error)
    return NextResponse.json(
      { error: "Failed to generate hot takes" },
      { status: 500 }
    )
  }
}
