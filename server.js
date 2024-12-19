const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory store for OTPs (this is temporary; in real applications, use a database)
let currentOtp = null;
let otpEmail = null;

// Send OTP to the user's email
app.post("/send-otp", (req, res) => {
    const email = req.body.email;

    // Generate a random 6-digit OTP
    currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpEmail = email;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jigu143parul@gmail.com",  // Replace with your email
            pass: "mqphrowviorbukvf",    // Replace with your email password
        },
    });

    // Email options
    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${currentOtp}`,
    };

    // Send the OTP email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error sending OTP" });
        }
        res.json({ success: true });
    });
});

// Validate the OTP entered by the user
app.post("/validate-otp", (req, res) => {
    const userOtp = req.body.otp;

    // Check if the OTP matches
    if (userOtp === currentOtp) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
