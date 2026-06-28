require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is Running 🚀");
});
app.post("/generate-email", async (req, res) => {

    const { recipient, emailType, tone, purpose } = req.body;

   try {

   const prompt = `
You are a professional email writer.

Write a complete ${tone} ${emailType} email.

Details:
Recipient Name: ${recipient}
Sender Name: Anusha
Purpose: ${purpose}

Instructions:
- Do not use placeholders like [Your Name], [Date], [Job Title], or [Company].
- Do not ask the user to fill anything.
- Do not mention any date in the email unless the user explicitly provides one.
- Generate a complete email with:
  • Subject
  • Greeting
  • Body
  • Closing
- Sign the email as "Anusha".
- Return only the email.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
        email: response
    });

} catch (error) {

    console.log(error);

    res.status(500).json({
        error: "Failed to generate email"
    });

}

});
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});