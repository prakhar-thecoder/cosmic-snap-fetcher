import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
import requests
import os


def get_env(var):
    var = os.environ.get(var)
    var = var.strip('"')
    
    return var


def get_apod():
    api_key = get_env("NASA_API_KEY")
    api_url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}"

    response = requests.get(api_url).json()
    image_url = response["url"]
    date = response["date"]
    title = response["title"]
    explanation = response["explanation"]

    return_data = {
        "date": date,
        "title": title,
        "explanation": explanation,
        "image_url": image_url
    }

    return return_data


def email_apod(emails):
    apod_data = get_apod()
    image = requests.get(apod_data["image_url"]).content

    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    login = get_env("LOGIN_EMAIL")
    password = get_env("LOGIN_PASSWORD")
    sender_email = login
    sender_name = get_env("SENDER_NAME")

    subject = f'APOD {apod_data["date"]}'
    body = f"""
Here's your APOD image for today. Enjoy!!!

Date: {apod_data["date"]}

Title: {apod_data["title"]}

Explanation: {apod_data["explanation"]}


About the Developer of this project
Name: Prakhar Parikh
Email: pnp14072005@gmail.com
LinkedIn: https://www.linkedin.com/in/prakhar-parikh/

Note: If you wish to not get this emails, please unsubscribe from the website!

Disclaimer: This project is developed as a hobby project. The images used are openly distributed by NASA and are not copyright protected. The author is not responsible for any unfair usage of this images or this project.
Thank you!
"""

    try:
        msg = MIMEMultipart()
        msg['From'] = formataddr((sender_name, sender_email))
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        image_part = MIMEImage(image)
        image_part.add_header(
            'Content-Disposition',
            'attachment',
            filename=f'APOD {apod_data["date"]}.jpg'
        )
        msg.attach(image_part)

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(login, password)
        server.sendmail(sender_email, emails, msg.as_string())
        server.close()

        return True
    except Exception as e:
        print(f"Error while sending email: {e}")
        return False


if __name__ == '__main__':
    print(get_apod())
    # email_apod(["prakharhacker@proton.me", "pnp14072005@gmail.com", "gpaguys@gmail.com"])
