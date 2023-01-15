from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

@app.route("/gift-all", methods=["GET"])
@cross_origin(origin="localhost", headers=["Content- Type","Authorization"])
def get_gift_all():
    response = jsonify({"teste": "teste"})
    return response

app.run(debug=True)