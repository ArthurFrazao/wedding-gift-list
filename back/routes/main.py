from database import BigQueryClass
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

bigquery = BigQueryClass()

@app.route("/gift-all", methods=["GET"])
@cross_origin(origin="localhost", headers=["Content- Type","Authorization"])
def get_gift_all():
    results = bigquery.execute_query(query="SELECT * FROM `wedding-website2023.backend.gifts`")
    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)