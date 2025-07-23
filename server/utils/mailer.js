import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetCode = async (to, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Code',
    html: `<p>Your password reset code is: <strong>${code}</strong></p>`,
  });
};
