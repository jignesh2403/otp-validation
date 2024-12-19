document.getElementById("sendOtp").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    // Send the email to the server to generate and send OTP
    fetch("/send-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("OTP sent successfully to your email!");
            document.getElementById("otpValidationForm").style.display = "block";
        } else {
            alert("Error sending OTP. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

document.getElementById("otpValidationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const otp = document.getElementById("otp").value;
    // Validate OTP with server
    fetch("/validate-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp }),
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById("message");
        if (data.success) {
            messageElement.textContent = "OTP validated successfully!";
            messageElement.classList.add("success");
        } else {
            messageElement.textContent = "Invalid OTP, please try again.";
            messageElement.classList.remove("success");
        }
    });
});
