import dotenv from "dotenv";
import mailer from "@sendgrid/mail";
import * as template from "./templates";
import moment from "moment";

dotenv.config();

export default async (to, action, data) => {
    const { SENDGRID_API_KEY, EMAIL_SENDER, NODE_ENV } = process.env;

    mailer.setApiKey(SENDGRID_API_KEY);

    const notifier = template[action](data);

    const message = {
        to,
        from: EMAIL_SENDER,
        subject: notifier.subject,
        text: "Hepta Analytics",
        html: `<div style="background:#e5eeff;width:100%;padding:20px 0;">
          <div style="max-width:760px;margin:0 auto;background:#ffffff">
          <div style="background:#28abe3;padding:10px;color:#ffffff;text-align:center;font-size:34px">
          Hepta Analytics
          </div>
          <div style="padding:20px;text-align:left;">
          ${notifier.html}
          </div>
          <br>
          <div style="padding:20px;text-align:left;">
          <b>Hepta Analytics</b>
          </div>
          </div>
          <div style="padding:35px 10px;text-align:center;">
          Copyright, ${moment().year()}<br>
            Hepta Analytics
          </div>
          </div>`
    };
    return NODE_ENV === "test" ? true : mailer.send(message);
};
