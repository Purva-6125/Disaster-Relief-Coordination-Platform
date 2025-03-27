import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Use your email
                pass: process.env.EMAIL_PASS, // Use your app password
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        console.log("Email sent successfully to:", to);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};


export default sendEmail;
