import { useState } from "react";
import axios from "axios";

function App() {

  const [recipient, setRecipient] = useState("");
  const [emailType, setEmailType] = useState("Job Application");
  const [tone, setTone] = useState("Professional");
  const [purpose, setPurpose] = useState("");

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  async function generateEmail() {

  if (!recipient || !purpose) {
    alert("Please fill all the fields");
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/generate-email`,
      {
        recipient,
        emailType,
        tone,
        purpose
      }
    );

    setGeneratedEmail(response.data.email);
    setLoading(false);

  } catch (error) {
     setLoading(false);
    console.log(error);
    alert("Something went wrong!");
  }

}
function copyEmail() {

  navigator.clipboard.writeText(generatedEmail);

  alert("Email copied successfully!");

}
function clearForm() {
  setRecipient("");
  setEmailType("Job Application");
  setTone("Professional");
  setPurpose("");
  setGeneratedEmail("");
}
  return (
    <div className="container">

      <h1>🤖 AI Email Generator</h1>

<p className="subtitle">
  Generate professional emails in seconds using Google Gemini AI.
</p>

      <label>👤 Recipient Name</label>

<input
  type="text"
  placeholder="Enter recipient name"
  value={recipient}
  onChange={(e) => setRecipient(e.target.value)}
/>
<label>📧 Email Type</label>

      <select
        value={emailType}
        onChange={(e) => setEmailType(e.target.value)}
      >
        <option>Job Application</option>
        <option>Leave Request</option>
        <option>Thank You</option>
        <option>Business</option>
      </select>

      <label>🎯 Tone</label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Professional</option>
        <option>Friendly</option>
        <option>Formal</option>
      </select>

      <label>📝 Purpose</label>
      <textarea
        rows="5"
       placeholder="Describe what the email should be about..."
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      ></textarea>

      <div className="button-group">
  <button onClick={generateEmail} disabled={loading}>
    {loading ? "⏳ Generating..." : "✨ Generate Email"}
  </button>

  <button onClick={clearForm} className="clear-btn">
    🗑️ Clear Form
  </button>
</div>
       {generatedEmail && (
  <>
    <hr />

    <h2>📋 Entered Details</h2>

    <p>
      <strong>Recipient:</strong> {recipient}
    </p>

    <p>
      <strong>Email Type:</strong> {emailType}
    </p>

    <p>
      <strong>Tone:</strong> {tone}
    </p>

    <p>
      <strong>Purpose:</strong> {purpose}
    </p>
  </>
)}
{generatedEmail && (
  <>
    <hr />

    <h2>📧 Generated Email</h2>

    <div className="email-box">

  <div className="email-header">
    📧 AI Generated Email
  </div>

  <pre>{generatedEmail}</pre>

</div>

    <button onClick={copyEmail}>
      📋 Copy Email
    </button>
  </>
)}
    </div>
  );
}

export default App;