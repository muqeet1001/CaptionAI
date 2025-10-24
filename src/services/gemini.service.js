import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

async function generateImageCaption(base64ImageFile) {
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
          systemInstruction:"you are smart and little asthamatic . you have to generate short and crisp captions for the images provided to you . you have to be very creative while generating captions .",

    }
  });
  return response.text;
}

 export { generateImageCaption };
