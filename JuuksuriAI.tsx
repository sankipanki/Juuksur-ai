
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader } from "lucide-react"

export default function JuuksuriAI() {
  const [input, setInput] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setAnswer("")
    try {
      const response = await fetch("/api/juuksuri-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })
      const data = await response.json()
      setAnswer(data.result)
    } catch (error) {
      setAnswer("Midagi läks valesti. Palun proovi hiljem uuesti.")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Juuksuri AI assistent</h1>
      <Textarea
        placeholder="Kirjelda olukorda, nt: 'Kliendil on paksud, sirged juuksed ja ta soovib õhulist lõikust...'"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="min-h-[120px]"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader className="animate-spin mr-2" /> : null}
        Küsi nõu
      </Button>
      {answer && (
        <Card>
          <CardContent className="whitespace-pre-wrap p-4">
            {answer}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
