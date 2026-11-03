import { useState, type FormEvent } from "react";
import { PageMeta } from "@/components/shared/page-meta";
import { useTranslations } from "@/i18n";

type Message = { role: "assistant" | "user"; text: string };

export default function FarmerAssistantPage() {
  const t = useTranslations();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: t("farmerAssistant.welcome") },
  ]);
  const [question, setQuestion] = useState("");

  const sendMessage = (text: string) => {
    const prompt = text.trim();
    if (!prompt) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "assistant", text: t("farmerAssistant.demoReply") },
    ]);
    setQuestion("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(question);
  };

  return (
    <>
      <PageMeta
        title={t("farmerAssistant.title")}
        description={t("farmerAssistant.description")}
      />
      <main className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("farmerAssistant.title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("farmerAssistant.description")}
          </p>
        </header>
        <section
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-sm dark:border-gray-800 dark:bg-gray-900"
          aria-label={t("farmerAssistant.title")}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {t("farmerAssistant.chatTitle")}
              </h2>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {t("farmerAssistant.demoNotice")}
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
              {t("farmerAssistant.demoBadge")}
            </span>
          </div>
          <div className="min-h-80 space-y-4 p-5" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"}`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 p-5 dark:border-gray-800">
            <p className="mb-3 text-xs font-medium text-gray-500 dark:text-gray-400">
              {t("farmerAssistant.suggestions")}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {(["ph", "nutrients", "leaves"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    sendMessage(t(`farmerAssistant.prompts.${key}`))
                  }
                  className="rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {t(`farmerAssistant.prompts.${key}`)}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <label className="sr-only" htmlFor="farmer-question">
                {t("farmerAssistant.inputLabel")}
              </label>
              <input
                id="farmer-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={t("farmerAssistant.inputPlaceholder")}
                className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none focus:border-brand-500 dark:border-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white hover:bg-brand-600"
              >
                {t("farmerAssistant.send")}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
