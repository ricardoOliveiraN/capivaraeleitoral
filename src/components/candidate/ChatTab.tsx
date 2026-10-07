"use client";

import { useEffect, useRef, useState } from "react";
import type { Candidate } from "@/lib/types";
import { answerQuestion, suggestedQuestions } from "@/lib/chat";
import { Card } from "@/components/ui";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

let counter = 0;
function nextId() {
  counter += 1;
  return counter;
}

export default function ChatTab({
  candidate,
  allCandidates,
}: {
  candidate: Candidate;
  allCandidates: Candidate[];
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId(),
      role: "assistant",
      text: `Olá! Sou o assistente do Capivara Eleitoral. Pergunte o que quiser sobre ${candidate.name}: temas, votações, promessas, histórico ou comparações. (Respostas simuladas com dados ilustrativos.)`,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed || typing) return;
    const userMessage: Message = { id: nextId(), role: "user", text: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    const answer = answerQuestion(trimmed, candidate, allCandidates);
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: nextId(), role: "assistant", text: answer },
      ]);
      setTyping(false);
    }, 450);
  }

  const suggestions = suggestedQuestions(candidate);

  return (
    <Card className="flex h-[600px] flex-col p-0">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold text-foreground">
          Chat sobre {candidate.name.split(" ")[0]}
        </h3>
        <p className="mt-1 text-xs text-muted">
          Respostas geradas a partir dos dados desta base (simulado).
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-brand text-white"
                  : "bg-surface-muted text-foreground"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {typing ? (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface-muted px-4 py-3 text-sm text-muted">
              digitando…
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border px-5 py-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => send(question)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted transition hover:border-brand hover:text-foreground"
            >
              {question}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escreva sua pergunta…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={typing || input.trim().length === 0}
            className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </Card>
  );
}
