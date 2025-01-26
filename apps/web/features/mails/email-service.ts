
import nodemailer from "nodemailer";
import handlebars, { TemplateDelegate } from "handlebars";
import { promises as fs } from "fs";
import path from "path";



// Class for all email service functions
class EmailService {
    
    transporter: nodemailer.Transporter;
    templatedCache: Map<string, TemplateDelegate>;

    constructor() {
        // trasporter with SMTP
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL_USER,
                pass: process.env.SMTP_EMAIL_PASSWORD
            }
        });

        // to store already compiled templates
        this.templatedCache = new Map();
    };


    // Load and compile the templetwe
    async getTemplate(templateName: string): Promise<TemplateDelegate> {
        if(this.templatedCache.has(templateName)) {
            return this.templatedCache.get(templateName) as TemplateDelegate;
        };

        
        // const filePath = path.join(__dirname, "/features/mails/templates", `${templateName}.hbs`);
        const templatesDir = path.join(process.cwd(), 'features', 'mails', 'templates');
        const filePath = path.join(templatesDir, `${templateName}.hbs`);
        const templateContent = await fs.readFile(filePath, "utf-8");
        const template: TemplateDelegate  = handlebars.compile(templateContent);
        this.templatedCache.set(templateName, template);
        return template;

    };


    // Sending email usinfg template
    async sendTemplatedEmail({
        to,
        subject,
        templateName,
        data
    }: {
        to: string,
        subject: string,
        templateName: string,
        data: Record<string, unknown>
    }) {

        try {
            const template = await this.getTemplate(templateName);
            
            const html = template(data);

            const info = await this.transporter.sendMail({
                from: "nithinreddykethireddy.test@gmail.com",
                to,
                subject,
                html
            });


            console.log(`Message sent: %s`, info.messageId);
            return { success: true, messageId: info.messageId};
        } catch (error) {
            console.log(process.cwd());
            throw new Error("Error sending email")
        };

    };


    // Methos to send verification email
    async sendVerificationEmail({
        email,
        username,
        verificationToken
    }: {
        email: string,
        username: string
        verificationToken: string
    }) {
        return this.sendTemplatedEmail({
            to: email,
            subject: "Verify Your Email",
            templateName: "mail-verification",
            data: {
                username: username,
                verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verification?token=${verificationToken}`
            }
        });
    };
    
}


const EmailServiceSingleton = new EmailService();

export default EmailServiceSingleton;