import nodemailer from "nodemailer";

interface EmailProps {
    token: string,
    mailId: string
}


export const sendVerificationEmail = async({
    token,
    mailId
}: EmailProps) => {
    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });

    
    const emailHtml = `<p>Click <a href="http://localhost:3001/auth/new-verification?token=${token}">here</a> to continue</p>`

    try {
        const sentResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to: mailId,
            subject: "Verification token for AuthJS",
            html: emailHtml
        })

        return
    } catch (error) {
        return
    }
} 