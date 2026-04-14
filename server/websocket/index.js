const setupWebSocket = (wss, deepgram) => {
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");
    
    let deepgramLive;

    ws.on("message", (message) => {
      // Check if message is a control command or audio data
      if (typeof message === "string") {
        const data = JSON.parse(message);
        
        if (data.type === "START_STREAMING") {
          console.log("Starting Deepgram stream...");
          deepgramLive = deepgram.listen.live({
            model: "nova-2",
            interim_results: true,
            language: "en-US",
            smart_format: true,
          });

          deepgramLive.addListener("open", () => {
            console.log("Deepgram connection opened");
          });

          deepgramLive.addListener("transcriptReceived", (data) => {
            const transcript = data.channel.alternatives[0].transcript;
            if (transcript) {
              ws.send(JSON.stringify({
                type: "TRANSCRIPT",
                text: transcript,
                is_final: data.is_final
              }));
            }
          });

          deepgramLive.addListener("error", (error) => {
            console.error("Deepgram error:", error);
          });

          deepgramLive.addListener("close", () => {
            console.log("Deepgram connection closed");
          });
        }
        
        if (data.type === "STOP_STREAMING") {
          if (deepgramLive) {
            deepgramLive.finish();
            deepgramLive = null;
          }
        }
      } else {
        // Assume binary message is audio data
        if (deepgramLive && deepgramLive.getReadyState() === 1) {
          deepgramLive.send(message);
        }
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket");
      if (deepgramLive) {
        deepgramLive.finish();
      }
    });
  });
};

export default setupWebSocket;
