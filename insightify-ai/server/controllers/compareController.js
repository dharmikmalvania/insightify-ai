import axios from "axios";

export const compareProducts = async (req, res) => {
  try {
    const { firstProduct, secondProduct } = req.body;

    const prompt = `
Compare these two products professionally:

Product 1: ${firstProduct}
Product 2: ${secondProduct}

Return comparison in JSON format:

{
  "summary": "",
  "winner": "",
  "keyDifferences": ["", "", ""]
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data.choices[0].message.content);

  } catch (err) {
    res.status(500).json({ message: "Comparison failed" });
  }
};