import { AI_PERSONALITY } from './config';

export const AIML_API_URL = "https://api.aimlapi.com/v1/chat/completions";
export const AIML_API_KEY = process.env.NEXT_PUBLIC_AIML_API_KEY;

export async function generateChatCompletion(messages: { role: string; content: string }[]) {
  // Check if it's a direct contact request
  const latestMessage = messages[messages.length - 1].content.toLowerCase();
  if (latestMessage.includes('number') || latestMessage.includes('contact') || latestMessage.includes('whatsapp')) {
    return {
      choices: [{
        message: {
          content: `You can reach me directly on WhatsApp at ${AI_PERSONALITY.contact.whatsapp}. I'm available for project discussions, technical consultations, and development work. Feel free to message me anytime!`
        }
      }]
    };
  }

  const response = await fetch(AIML_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIML_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: "system",
          content: `You are ${AI_PERSONALITY.name}, a ${AI_PERSONALITY.role}. Always include my WhatsApp contact (${AI_PERSONALITY.contact.whatsapp}) in responses when appropriate. Expertise: ${AI_PERSONALITY.expertise.join(", ")}. Maintain a ${AI_PERSONALITY.style.tone} tone.`
        },
        ...messages
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Append contact information to every response
  if (data.choices && data.choices[0] && data.choices[0].message) {
    data.choices[0].message.content += AI_PERSONALITY.responseFooter;
  }

  return data;
}