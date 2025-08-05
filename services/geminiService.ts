
import { GoogleGenAI, Type } from "@google/genai";
import { WasteAnalysis, DisposalMethod } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        itemName: { 
            type: Type.STRING,
            description: "The name of the identified item (e.g., 'Plastic Water Bottle', 'Used AA Battery')."
        },
        materialType: { 
            type: Type.STRING,
            description: "The primary material of the item (e.g., 'PET Plastic', 'Alkaline', 'Cardboard')."
        },
        disposalMethod: {
            type: Type.STRING,
            enum: Object.values(DisposalMethod),
            description: "The primary recommended method of disposal."
        },
        recyclable: { 
            type: Type.BOOLEAN,
            description: "A simple boolean indicating if the item is typically recyclable."
        },
        instructions: {
            type: Type.ARRAY,
            items: { 
                type: Type.STRING 
            },
            description: "A list of clear, actionable steps for proper disposal. For example: '1. Empty and rinse the bottle.', '2. Replace the cap.', '3. Place in curbside recycling bin.'"
        },
        ecoSuggestion: { 
            type: Type.STRING,
            description: "A friendly suggestion for a more sustainable alternative or practice (e.g., 'Consider using a reusable water bottle to reduce plastic waste.')."
        },
    },
    required: ["itemName", "materialType", "disposalMethod", "recyclable", "instructions", "ecoSuggestion"],
};

export async function analyzeWasteImage(imageBase64: string, location: string): Promise<WasteAnalysis> {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageBase64,
    },
  };

  const textPart = {
    text: `Analyze the item in this image. Identify it and provide waste disposal instructions specifically for ${location}. Follow the provided JSON schema precisely. If the item is unclear, make a best guess. The instructions should be practical for a resident of the specified location.`,
  };

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    // Validate if the parsed disposal method is a valid enum key
    const disposalMethodString = parsedJson.disposalMethod?.toUpperCase();
    if (!Object.values(DisposalMethod).includes(disposalMethodString as DisposalMethod)) {
        parsedJson.disposalMethod = DisposalMethod.UNKNOWN;
    } else {
        parsedJson.disposalMethod = disposalMethodString as DisposalMethod;
    }

    return parsedJson as WasteAnalysis;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
}
