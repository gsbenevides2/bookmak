import OpenAI from "openai";
import "dotenv/config";

const instructions = `Vou te passar a descrição de alguns livros e seus nomes, me gere somente 4 textos curtos com no maximo 10 palavras cada, eu irei usar esses textos para escrever em um marca página customizado. Você deve me retornar somente uma lista numerada. Os textos não podem incluir o nome do livro.`;

function transformMarkdownOrderedListToArrayAndRemoveNumbers(
  markdown: string,
): string[] {
  return markdown
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s/, ""))
    .filter(Boolean);
}

type Books = Array<{
  name: string;
  description: string;
}>;

function makeBooksText(books: Books): string {
  return books
    .map((book) => `Livro: ${book.name}\nDescrição: ${book.description}`)
    .join("\n");
}

export class BookmarkGenerator {
  openai = new OpenAI();
  assistantId?: string;

  async loadOpenAi(): Promise<void> {
    const assistant = await this.openai.beta.assistants.create({
      name: "Bookmak",
      model: "gpt-4-turbo",
      instructions,
    });
    this.assistantId = assistant.id;
  }

  async generateBookmarks(books: Books): Promise<string[]> {
    /*
    const assistantId = this.assistantId;
    if (assistantId == null) {
      throw new Error("Assistant not loaded");
    }
    const callback = async (
      resolve: (value: string[]) => void,
      reject: (reason: any) => void,
    ): Promise<void> => {
      const thread = await this.openai.beta.threads.create();
      await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: makeBooksText(books),
      });
      const run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistantId,
      });

      if (run.status === "completed") {
        const messages = await this.openai.beta.threads.messages.list(
          run.thread_id,
        );
        for (const message of messages.data.reverse()) {
          const content = message.content[0];
          if (content.type === "text" && message.role === "assistant") {
            const texts = transformMarkdownOrderedListToArrayAndRemoveNumbers(
              content.text.value,
            );
            resolve(texts);
          }
        }
      } else {
        reject(new Error("OpenAI request failed the run is not completed"));
      }
    };

    return await new Promise((resolve, reject) => {
      callback(resolve, reject).catch(reject);
    });
    */
    const message = `${instructions}\n${makeBooksText(books)}`;
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
      max_tokens: 100,
      temperature: 1,
    });
    const openAiText = response.choices[0].message.content;
    if (openAiText == null) return [];

    const texts =
      transformMarkdownOrderedListToArrayAndRemoveNumbers(openAiText);
    return texts;
  }

  static instance = new BookmarkGenerator();
  static getInstance(): BookmarkGenerator {
    return this.instance;
  }
}
