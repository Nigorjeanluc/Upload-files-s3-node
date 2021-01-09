import dotenv from "dotenv";
import { generate as generateToken } from "../../../utils/tokens";

dotenv.config();

export default (data) => {
    const message = {};
    const token = generateToken({ email: data.email }, { expiresIn: "1h" });
    const appUrl = process.env.APP_URL_FRONTEND;
    const link = `${appUrl}/reset-password/${token}`;
    message.subject = "Reset your password - Hepta Analytics";
    message.html = `Hello ${data.names} </br>,
  <p>You are receiving this because you have requested the reset of the password,<br>
   Click on the reset link bellow to complete the process<br>
  <br><br><br>
<a href='${link}' style="margin:35px 0;padding:15px 35px;background:#28abe3;color:#ffffff;clear:both;border-radius:30px;text-decoration:none" target='_blank'>Resert password Now</a></p>`;
    return message;
};
