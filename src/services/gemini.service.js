import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

async function generateImageCaption(base64ImageFile, style = 'default') {
  const styleHint = style && style !== 'default' ? ` Tone/style: ${style}.` : '';
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
          systemInstruction:`You are a creative caption writer. Generate short, crisp, on-brand captions for the given image.${styleHint}`,
    }
  });
  return response.text;
}

 export { generateImageCaption };
