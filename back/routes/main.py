from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

@app.route("/gift-all", methods=["GET"])
def get_gift_all():
    return "teste"

app.run(debug=True)
CORS(app)