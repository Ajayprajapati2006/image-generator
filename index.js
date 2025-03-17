const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
// require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: "your-api-key", // Ensure this is set in .env file
});

app.post("/generate-image", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    try {
        const response = await client.images.generate({
            model: "black-forest-labs/flux-dev",
            response_format: "b64_json",
            extra_body: {
                response_extension: "webp",
                width: 1024,
                height: 1024,
                num_inference_steps: 28,
                negative_prompt: "",
                seed: -1
            },
            prompt: prompt
        });

        res.json({ image: response });
    } catch (error) {
        console.error("API Request Failed:", error);
        res.status(500).json({ error: "API request failed", message: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
