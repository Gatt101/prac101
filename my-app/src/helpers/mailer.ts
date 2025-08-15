// src/helpers/mailer.ts

import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}) => {
  try {
    const token = await bcrypt.hash(userId, 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: process.env.USERMAIL!,
        pass: process.env.USERPASSWORD!,
      },
    });

    // verifying the email
    const mailOptions = {
      from: '"MyApp" <no-reply@gauravpatil.me>',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password',
      html: `
        <p>Click 
        <a href="${process.env.DOMAIN}/verifyemail?token=${token}">
        here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.</p>
      `,
    };

    // resetting the password
    if (emailType === 'RESET') {
      mailOptions.html = `
        <p>Click
        <a href="${process.env.DOMAIN}/passwordreset?token=${token}">
        here</a> to change your password.</p>
      `;
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error('Error in sendEmail:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
};
