import nodemailer from "nodemailer";

interface EmailProps {
    token: string,
    mailId: string
}


const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    }
});


export const sendVerificationEmail = async({
    token,
    mailId
}: EmailProps) => {

    
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
};


export const sendPasswordResetMail = async ({
    token,
    mailId
}: EmailProps) => {

    const emailHtml = `<p>Click <a href="${process.env.APP_URL}/auth/new-password?token=${token}">here</a> to reset your password</p>`

    try {
        const sentResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to: mailId,
            subject: "Password reset token",
            html: emailHtml
        })

        return
    } catch (error) {
        return
    }
};


export const sendTwoFactorCodeMail = async ({
    token,
    mailId
}: EmailProps) => {
    const emailHtml = `<p>Your 2FA Code - ${token}</p>`

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to: mailId,
            subject: "2FA code",
            html: emailHtml
        });

        return
    } catch (error) {
        return        
    }
}