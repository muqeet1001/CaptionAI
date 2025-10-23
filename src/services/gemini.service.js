import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyDYbafEd8ELnS7DRXs2RzI5abWahrpV4_s"
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();