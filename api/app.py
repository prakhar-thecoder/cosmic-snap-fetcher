from flask import *
from flask_cors import CORS
import utils


app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Server is up and running!!!"

@app.route("/get-apod-data")
def get_apod_data():
    data = utils.get_apod()
    
    return jsonify({
        "status": "success",
        "data": data
    }), 200

@app.route("/email-once", methods=["POST"])
def email_once():
    email = request.json.get("email")
    print(email)

    if not email:
        return jsonify({
            "status": "fail",
            "error": "Please provide email!"
        }), 500
    
    email_sent = utils.email_apod([email])
    if email_sent:
        return jsonify({
            "status": "success",
            "data": None
        }), 200
    else:
        return jsonify({
            "status": "fail",
            "error": "Some error occurred! Please try again."
        }), 500


if __name__ == '__main__':
    app.run("0.0.0.0", port=5000, debug=True)