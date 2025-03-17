const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
// require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
    baseURL: "https://api.studio.nebius.com/v1/",
    apiKey: "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExODE3NTgyOTI3Nzc3MzQxMjkxMSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5OTg4NzMzNiwidXVpZCI6IjJhYmQxZGNjLWMxZDItNDE4OS1hZmUxLWNmMDcwZDVhYmRlMCIsIm5hbWUiOiJyYWplbmRyYSBqYW5naWQiLCJleHBpcmVzX2F0IjoiMjAzMC0wMy0xNlQxMDoyODo1NiswMDAwIn0._nxVmmuSvKZUIkxdbQdliHiL0MqDoxmQcI8iU67rUVk", // Ensure this is set in .env file
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