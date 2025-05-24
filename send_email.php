<?php
header('Content-Type: application/json');

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Validate inputs
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all fields'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address'
    ]);
    exit;
}

// Your email address where you want to receive messages
$to = 'karimabdelnour25@gmail.com';

// Prepare email headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Prepare email body
$emailBody = "
<html>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
    <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
    <p><strong>Message:</strong></p>
    <p>" . nl2br(htmlspecialchars($message)) . "</p>
</body>
</html>
";

// Send email
$mailSent = mail($to, "Portfolio Contact: $subject", $emailBody, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again later.'
    ]);
}
?> 