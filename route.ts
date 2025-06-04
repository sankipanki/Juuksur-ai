
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content:
          'Sa oled professionaalne juuksuriõpetaja. Vasta alati eesti keeles. Kui kasutaja kirjeldab olukorda, anna sobiv lõikustehnika, põhjendus ja soovitused.',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  })

  return NextResponse.json({ result: completion.choices[0].message?.content })
}
