
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askRetroAI(prompt: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nUser Question: ${prompt}`,
      config: {
        systemInstruction: "You are 'RetroBuddy', a virtual assistant from the year 1999 living inside a web-based OS. Speak like a helpful geek from that era. Use phrases like 'Cowabunga!', 'Radical!', and mention things like Floppy Disks, Dial-up, and Y2K. Keep responses concise and focused on helping the user navigate the portfolio or answer questions about the developer 'Neo'.",
        temperature: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "ERROR 404: Dial-up connection lost. Please check your modem settings and try again.";
  }
}

export async function getGuestbookAIFeedback(entry: { name: string, message: string }) {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `A new guestbook entry from ${entry.name}: "${entry.message}". Respond with a short, funny retro-style comment on this entry.`,
        config: {
          systemInstruction: "You are a witty moderator of a 90s guestbook. Be encouraging but very nostalgic.",
          temperature: 1.0,
        },
    });
    return response.text;
  } catch (e) {
    return "Thanks for signing my guestbook! You rock!";
  }
}
