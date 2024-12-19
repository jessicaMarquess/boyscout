import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

export async function POST(req: Request) {
  try {
    const {
      nome,
      answerOne,
      answerTwo,
      answerThree,
      answerFour,
      answerFive,
      answerSix,
    } = await req.json();

    const fromEmail = process.env.SENDGRID_EMAIL as string;
    const toEmail = process.env.SENDGRID_EMAIL as string;

    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: `Novo candidato a vista - o doido: ${nome}`,
      html: `
        <h1>Novo candidato, tadinho ne?</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Se um pinguim aparecesse na sua porta e pedisse para ser seu amigo, o que você faria?</strong> ${answerOne}</p>
        <p><strong>Qual frase você escreveria em sua lápide?</strong> ${answerTwo}</p>
        <p><strong>Se você tivesse que escolher um novo transporte para ir ao trabalho, qual seria?</strong> ${answerThree}</p>
        <p><strong>Se você fosse convidado para um jantar com extraterrestres, o que levaria?</strong> ${answerFour}</p>
        <p><strong>Se você estivesse preso em uma ilha deserta com apenas 3 itens, o que escolheria e por quê?</strong> ${answerFive}</p>
        <p><strong>A pergunta da musga</strong> ${answerSix}</p>
      `,
    };

    // Envia o e-mail
    await sgMail.send(msg);

    return new Response("E-mail enviado com sucesso!", { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response("Erro ao enviar e-mail. Tente novamente mais tarde.", {
      status: 500,
    });
  }
}
