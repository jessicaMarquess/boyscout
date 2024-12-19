"use server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, answerOne, answerTwo, answerThree, answerFour, answerFive } =
    await req.json();

  console.log(process.env.MAILTRAP_USER);
  try {
    // Configuração do transporter para o Mailtrap
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Envio do e-mail
    await transporter.sendMail({
      from: `<${process.env.MAILTRAP_USER}>`, // Remetente
      to: process.env.RECEIVER_EMAIL, // Destinatário
      subject: `Nova mensagem de ${name}`,
      html: `
        <h1>Nova Mensagem</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Se um pinguim aparecesse na sua porta e pedisse para ser seu amigo, o que você faria?:</strong> ${answerOne}</p>
        <p><strong>Qual frase você escreveria em sua lápide?:</strong> ${answerTwo}</p>
        <p><strong>Se você tivesse que escolher um novo transporte para ir ao trabalho, qual seria?</strong> ${answerThree}</p>
        <p><strong>Se você fosse convidado para um jantar com extraterrestres, o que levaria?</strong> ${answerFour}</p>
        <p><strong>Se você estivesse preso em uma ilha deserta com apenas 3 itens, o que escolheria e por quê?</strong> ${answerFive}</p>
      `,
    });

    return NextResponse.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { message: "Erro ao enviar e-mail. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
