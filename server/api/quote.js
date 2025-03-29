// server/api/quote.js
export default defineEventHandler(async (event) => {
  try {
    const response = await fetch("https://api.hamatim.com/quote");
    const data = await response.json();
    return data;
  } catch (error) {
    return { text: "Failed to fetch quote.", author: "Unknown" };
  }
});
