import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта ПСК Пожарная Лига на почту iluxabor@yandex.ru"""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body", "{}"))
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Invalid request"}, ensure_ascii=False)}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Name and phone required"}, ensure_ascii=False)}

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_user = "iluxabor@yandex.ru"
    to_email = "iluxabor@yandex.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = smtp_user
    msg["To"] = to_email

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="background: linear-gradient(135deg, #ea580c, #dc2626); padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 20px;">🔥 Новая заявка с сайта</h2>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">ПСК «Пожарная Лига»</p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Имя:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600; font-size: 15px;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Телефон:</td>
            <td style="padding: 10px 0; color: #111827; font-weight: 600; font-size: 15px;"><a href="tel:{phone}" style="color: #ea580c; text-decoration: none;">{phone}</a></td>
          </tr>
          {"<tr style='border-top: 1px solid #f3f4f6;'><td style='padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;'>Сообщение:</td><td style='padding: 10px 0; color: #111827; font-size: 14px; line-height: 1.6;'>" + message + "</td></tr>" if message else ""}
        </table>
      </div>
    </div>
    """

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True, "message": "Заявка отправлена"}),
    }