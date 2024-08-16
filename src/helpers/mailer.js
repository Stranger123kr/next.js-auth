import User from "@/model/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// =========================================

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashToken = await bcrypt.hash(userId, 12);

    // ========================================

    // html content for send user via email

    const verifyEmailHTML = `
      <table role="presentation" style="width: 100%; background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td style="text-align: center;">
                
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; margin: 0 auto; border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="color: #333333; font-size: 24px; margin: 0;">Email Verification</h1>
                            <p style="color: #555555; font-size: 16px; margin: 10px 0 20px;">Please verify your email address by clicking the button below.</p>
                            
                            <a href="${process.env.DOMAIN}/verifyuseremail" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; margin-bottom: 20px;">Verify Email</a>
                            <p style="color: #555555; font-size: 14px; margin: 0;">If you did not request this email, you can safely ignore it.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f4f4f4; padding: 10px; text-align: center;">
                            <p style="color: #777777; font-size: 12px; margin: 0;">&copy; 2024 Your Company. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
      `;

    const resetPasswordHTML = `
      <p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }or copy and paste the link below in your browser.
      <br>
      </p>${process.env.DOMAIN}/verifyemail?token=${hashToken}
      `;

    // ========================================

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpire: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nitesh8825kr@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: '"Nitesh", <Niteshpapa@gmail.com>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Password",
      html: emailType === "VERIFY" ? verifyEmailHTML : resetPasswordHTML,
    };

    const info = await transporter.sendMail(mailOption);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
