
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    }
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running successfully"
  });
});

app.post("/api/subscribe", async (req, res) => {
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim()
      : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address."
    });
  }

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const from = process.env.EMAIL_FROM;
  const apiBase =
    process.env.MAILGUN_API_BASE || "https://api.mailgun.net";

  if (!apiKey || !domain || !from) {
    return res.status(500).json({
      message: "Mailgun configuration is missing."
    });
  }

  try {
    const form = new FormData();

    form.append("from", from);
    form.append("to", email);
    form.append("subject", "Welcome to DEV@Deakin Newsletter");
    form.append(
      "text",
      "Thank you for subscribing to DEV@Deakin!"
    );
    form.append(
      "html",
      "<h1>Welcome to DEV@Deakin!</h1>" +
      "<p>Thank you for subscribing to our newsletter.</p>" +
      "<p>Stay tuned for our latest articles and tutorials.</p>"
    );

    const credentials = Buffer.from(
      `api:${apiKey}`
    ).toString("base64");

    const response = await fetch(
      `${apiBase}/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`
        },
        body: form
      }
    );

    const result = await response.json().catch(() => ({}));

    console.log("Mailgun API HTTP status:", response.status);

    if (!response.ok) {
      console.error("Mailgun API error:", result);

      return res.status(502).json({
        message: "Mailgun could not accept the email request."
      });
    }

    console.log("Mailgun accepted the request:", result.message);

    return res.status(200).json({
      message: "Newsletter request successful!",
      providerStatus: response.status,
      emailId: result.id
    });
  } catch (error) {
    console.error("Mailgun request failed:", error.message);

    return res.status(502).json({
      message: "Could not connect to Mailgun."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
