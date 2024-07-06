// chatRouter.js
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const router = express.Router();

router.post('/', async(req, res) => {
    const { question } = req.body;
    console.log(`Received question: ${question}`);

    try {
        const genAI = new GoogleGenerativeAI("AIzaSyBenW74LDQvaUji5XmpBBF5_cogoCxNHJU ");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        let prompt = question;

        // Check if the question is about a specific piece
        const pieces = ["engine", "brake", "transmission"]; // Add more pieces as needed
        const matchedPiece = pieces.find(piece => prompt.includes(piece));

        if (matchedPiece) {
            // Modify the prompt to ask for an example of the named piece
            prompt = `Can you provide an example of a ${matchedPiece}?`;
        }

        console.log(`Sending prompt to Google Generative AI: ${prompt}`);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        console.log(`Generated response: ${text}`);
        res.json({ response: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;