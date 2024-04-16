import OpenAI from "openai";
import "dotenv/config";

const instructions = `Vou te passar a descrição de alguns livros e seus nomes, me gere 4 textos curtos para eu escrever em um marca página customizado. Os textos devem ser curtos com menos de 15 palavras. Você deve me retornar uma lista numerado. Os textos não podem incluir o nome do livro.`;

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
    .map((book) => `Livro: ${book.name} Descrição: ${book.description}`)
    .join("\n");
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BookmarkGenerator {
  static openai = new OpenAI();
  static assistantId: string;
  static async loadOpenAi(): Promise<void> {
    const assistant = await this.openai.beta.assistants.create({
      name: "Bookmak",
      model: "gpt-4-turbo",
      instructions,
    });
    this.assistantId = assistant.id;
  }

  static async generateBookmarks(books: Books): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return await new Promise<string[]>(async (resolve, reject) => {
      const thread = await this.openai.beta.threads.create();
      await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: makeBooksText(books),
      });
      const run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: this.assistantId,
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
        console.log(run.status);
      }
    });
  }
}
