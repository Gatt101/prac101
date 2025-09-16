import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Expected environment variables (set these in your .env.local):
// - SMTP_HOST (e.g. "smtp.mailtrap.io" or your provider)
// - SMTP_PORT (e.g. "587")
// - SMTP_USER
// - SMTP_PASS
// - RECEIVER_EMAIL (the email address that should receive contact form messages)
// - SENDER_EMAIL (optional; recommended to match your SMTP/account domain)

function isValidEmail(email?: unknown) {
  if (typeof email !== "string") return false;
  // simple regex for basic validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    // Accept either "task" or "message" field from the client
    const task = typeof body?.task === "string" ? body.task.trim() : typeof body?.message === "string" ? body.message.trim() : "";

    // Basic validation
    if (!name) return NextResponse.json({ message: "Missing name" }, { status: 400 });
    if (!email || !isValidEmail(email)) return NextResponse.json({ message: "Invalid or missing email" }, { status: 400 });
    if (!task) return NextResponse.json({ message: "Missing task/message" }, { status: 400 });

    const receiver = process.env.RECEIVER_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!receiver) return NextResponse.json({ message: "Server not configured: RECEIVER_EMAIL missing" }, { status: 500 });
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) return NextResponse.json({ message: "Server not configured: SMTP settings missing" }, { status: 500 });

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const fromAddress = process.env.SENDER_EMAIL || smtpUser;

    const mailOptions = {
      from: fromAddress,
      to: receiver,
      subject: `New contact request from ${name}`,
      text: `You have a new contact request:\n\nName: ${name}\nEmail: ${email}\n\nTask/Message:\n${task}`,
      // set reply-to so you can reply directly to the user's email
      replyTo: email,
    } as const;

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}