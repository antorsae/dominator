// pages/api/gpt4.js

import axios from "axios";

export default async function handler(req, res) {
  const { businessDescription } = req.body;

  try {
    const gpt4Response = await axios.post(
      "https://api.openai.com/v1/engines/gpt-4/completions",
      {
        prompt: `Suggest 10 domain names based on the idea below. Only answer domain names. Prefer domain names that are short and good.\n${businessDescription}`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "OpenAI-Org-ID": process.env.OPENAI_ORG_ID,
        },
      }
    );

    const llm_response = gpt4Response.data.choices[0].text
      .trim()
      .split("\n")
      .filter((suggestion) => suggestion);

    res.status(200).json({ llm_response });
  } catch (error) {
    res.status(500).json({ message: "Error calling GPT-4 API" });
  }
}
