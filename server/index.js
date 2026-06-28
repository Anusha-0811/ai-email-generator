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
    console.log(req.body);

   const { recipient, sender, emailType, tone, purpose } = req.body;

   try {

   const prompt = `
You are a professional email writer.

Write a complete ${tone} ${emailType} email.

Details:
Recipient Name: ${recipient}
Sender Name: ${sender}
Purpose: ${purpose}

Instructions:

- Do NOT generate a Subject line.
- Start directly with the greeting.
-- Start directly with the greeting.
- Use these greeting rules strictly:
  • If the recipient is "HR", "Hiring Manager", "Recruiter", or another official department/role, use "Dear <Recipient>".
  • If the recipient is a person's name:
      - Friendly → "Hi <Recipient>,"
      - Professional → "Hello <Recipient>,"
      - Formal → "Hello <Recipient>,"
- Do not use "Dear" for a person's name.
- Write a natural, professional, and well-structured email.
- Do not use placeholders like [Your Name], [Recipient], [Date], [Company], or [Job Title].
- Do not ask the user to fill in any information.
- Do not mention dates unless the user explicitly provides one.
- End the email with an appropriate closing such as:
  • Best regards,
  • Sincerely,
  • Thank you,
  depending on the tone.
- Sign the email using the Sender Name provided.
- Return only the email body. Do not include titles, headings, labels, markdown, or any explanation.
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