import { DeepgramClient } from "@deepgram/sdk";
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();

// In v3+, createClient was the way. In v5+, we use DeepgramClient class directly or the factory.
// Based on our debug keys, DeepgramClient is available.
export const deepgram = new DeepgramClient(process.env.DEEPGRAM_API_KEY);

export async function testDeepgram() {
  console.log("Testing Deepgram API Key...");
  try {
    const response = await fetch("https://api.deepgram.com/v1/listen", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: "https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav"
      })
    });

    const data = await response.json();
    console.log("Deepgram response:", data);
    
    if (data.results) {
      console.log("✅ Deepgram is working correctly!");
    } else {
      console.log("❌ Deepgram returned an error or unexpected response.");
    }
  } catch (error) {
    console.error("Deepgram test failed:", error.message);
  }
}
