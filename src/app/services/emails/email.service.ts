import nodemailer from "nodemailer"
import Exception from "./../../utils/error.utility";

export default class Auth_EmailService {
    public host: string
    public sender_email: string
    public sender_subject: string
    public username: string
    public password: string
    public text: string
    public html: any

    constructor(params: any) {
        this.host = process.env.MAIL_HOST || 'mail.mycamp.ir'
        this.sender_email = process.env.MAIL_FROM_ADDRESS || ''
        this.sender_subject = params.subject || process.env.MAIL_FROM_NAME
        this.username = process.env.MAIL_USERNAME || ''
        this.password = process.env.MAIL_PASSWORD || ''
        this.text = params.text || '' 
        this.html = params.html || ''
    }

    async send(to: string) {
        
        let transporter = nodemailer.createTransport({
            host: this.host,
            port: 465,
            secure: true,
            auth: {
                user: this.username,
                pass: this.password
            }
        })

        let mailOptions = {
            from: this.sender_email,
            to: to,
            subject: this.sender_subject,
            text: this.text,
            html: this.html
        }

        await transporter.sendMail(mailOptions)
    }
}