import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  try {
    const { apiKey, thoughts } = await req.json()

    if (!apiKey || !thoughts) {
      return NextResponse.json({ error: "API key and thoughts are required" }, { status: 400 })
    }

    const openai = createOpenAI({
      apiKey: apiKey,
    })

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Transform the following thoughts into 3-5 concise, sharp "hot takes" - bold, controversial, or provocative statements that capture the essence of the original thoughts. Each hot take should be:
      - One sentence long
      - Direct and punchy
      - Thought-provoking or slightly controversial
      - Capture the core insight from the original thoughts
      
      Original thoughts: "${thoughts}"
      
      Format your response as a numbered list of hot takes, one per line.`,
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
    return NextResponse.json({ error: "Failed to generate hot takes" }, { status: 500 })
  }
}
