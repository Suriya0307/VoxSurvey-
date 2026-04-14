import { deepgram } from './deepgram.js';

export const generateSpeech = async (text) => {
  try {
    const response = await deepgram.speak.request(
      { text },
      {
        model: "aura-asteria-en",
        encoding: "linear16",
        container: "wav",
      }
    );

    const stream = await response.getStream();
    if (stream) {
      return stream;
    } else {
      throw new Error("Error generating audio stream");
    }
  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
};
