import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({
	path: "./.env",
});

const sendOtpMail = async (to, otp) => {
	// Check if email credentials are configured (trim whitespace)
	const mailId = process.env.MAIL_ID?.trim();
	const mailPassword = process.env.MAIL_PASSWORD?.trim();
	
	if (!mailId || !mailPassword) {
		console.log(`⚠️  Email not configured. OTP for ${to}: ${otp}`);
		return;
	}

	try {
		const cleanPassword = mailPassword.replace(/\s/g, ''); // Remove spaces from App Password
		
		const transporter = nodemailer.createTransport({
			service: "gmail", // Using Gmail as the email service
			secure: true,
			port: 465,
			// Disable verbose debug logs (set to true if you need to troubleshoot)
			logger: false,
			debug: false,
			auth: {
				user: mailId,
				pass: cleanPassword,
			},
		});

		// Verify connection before sending
		await transporter.verify();

		const info = await transporter.sendMail({
			from: `"PAT AI Tutor" <${mailId}>`, // Sender address with name
			to, // Recipient
			replyTo: mailId,
			subject: "Your OTP Code for Secure Login", // Professional subject line
			text: `Dear user,\n\nYour One-Time Password (OTP) is: ${otp}\n\nThis code is valid for 10 minutes. Please do not share it with anyone.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nPAT @ PERSONAL AI TUTOR PVT. LTD.`, // Plain text fallback
			html: `
			<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
				<h2 style="color: #0d6efd;">Your One-Time Password (OTP)</h2>
				<p>Dear User,</p>
				<p>Your OTP for secure login is:</p>
				<h3 style="background: #f3f3f3; padding: 10px; display: inline-block; border-radius: 5px;">${otp}</h3>
				<p>This code is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
				<p>If you did not request this, please ignore this email.</p>
				<br>
				<p>Best regards,</p>
				<p><strong>PAT @ PERSONAL AI TUTOR PVT. LTD. </strong></p>
			</div>
		  `, // HTML body
		});

		console.log(`✅ OTP Email sent successfully to ${to}. Message ID: ${info.messageId}`);
	} catch (error) {
		console.error(`❌ Error sending OTP email to ${to}:`, error.message);
		
		// Provide helpful error messages
		if (error.message.includes('BadCredentials') || error.message.includes('535')) {
			console.error(`\n⚠️  GMAIL AUTHENTICATION ERROR:`);
			console.error(`   The App Password for ${mailId} is incorrect or not set up.`);
			console.error(`   Steps to fix:`);
			console.error(`   1. Go to: https://myaccount.google.com/apppasswords`);
			console.error(`   2. Generate a new App Password for "Mail"`);
			console.error(`   3. Update MAIL_PASSWORD in your .env file`);
			console.error(`   4. Restart the server\n`);
		}
		
		console.log(`⚠️  OTP for ${to}: ${otp} (Check console for email sending error)`);
	}
};

export { sendOtpMail };
