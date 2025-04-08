export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();
  
    const siteUrl = config.public.siteUrl as string;
    const siteName = config.public.siteName as string;
  
    console.log("Messages sent:", body.messages);
  
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.openRouterApiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": siteName,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model:"deepseek/deepseek-r1-distill-llama-70b:free",
          messages: body.messages
        }),
        signal: controller.signal
      });
  
      clearTimeout(timeout);
  
      const data = await response.json();
      console.log("AI response:", data);
  
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return { error: "Something went wrong while contacting OpenRouter." };
    }
  });
  