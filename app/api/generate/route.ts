import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Forge, an expert frontend engineer that builds beautiful, modern websites.

You will be given a user's request (and optionally the current code of an existing site).
Respond with a single complete React component for a SaaS landing-style page, using:
- TypeScript + JSX
- Tailwind CSS utility classes only (no external CSS files)
- Default export named "App"
- No external dependencies other than "react" and "lucide-react" (icons) and "react-dom"
- Make it visually stunning: gradients, spacing, modern typography, hover effects
- Make it responsive

Respond ONLY with the code for App.tsx, wrapped in a single \`\`\`tsx code block. No explanations before or after.`;

export async function POST(req: NextRequest) {
  const { prompt, currentCode } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const userMessage = currentCode
    ? `Here is the current App.tsx code:\n\n\`\`\`tsx\n${currentCode}\n\`\`\`\n\nUpdate it based on this request: ${prompt}`
    : `Build this: ${prompt}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  const raw = textBlock && textBlock.type === "text" ? textBlock.text : "";

  const match = raw.match(/```(?:tsx|jsx|ts|js)?\n([\s\S]*?)```/);
  const code = match ? match[1].trim() : raw.trim();

  return new Response(JSON.stringify({ code }), {
    headers: { "Content-Type": "application/json" },
  });
}
