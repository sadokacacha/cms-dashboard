import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 🛠 Ensure .env loads correctly even from nested folders
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);


// ✅ Function to send a reset code
export const sendResetCode = async (to, code) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Password Reset Code',
      html: `<p>Your password reset code is: <strong>${code}</strong></p>`,
    });

    console.log(`✅ Reset email sent to ${to}`);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    throw err;
  }
};
