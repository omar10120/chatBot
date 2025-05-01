export const AIML_API_URL = "https://api.aimlapi.com/v1/chat/completions"
export const AIML_API_KEY = process.env.NEXT_PUBLIC_AIML_API_KEY;

export async function generateChatCompletion(messages: { role: string; content: string }[]) {
    
  const response = await fetch(AIML_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIML_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: messages
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}