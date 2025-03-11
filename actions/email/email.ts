"use server";

import Mail from "nodemailer/lib/mailer"
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { contactHTML } from "@/lib/email-templates/contact";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
} as SMTPTransport.Options)

type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
}

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, recipients, subject, message } = dto;

  try {
    await transport.sendMail({
      from: sender,
      to: recipients,
      subject,
      html: contactHTML(message),
      text: message
    })
  }
  catch (error) {
    console.log(error)
  }
}
