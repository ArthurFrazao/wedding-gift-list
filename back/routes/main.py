from database import BigQueryClass
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from google.cloud import bigquery

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

@app.route("/gift-all", methods=["GET"])
@cross_origin(origin="localhost", headers=["Content- Type","Authorization"])
def get_gift_all():
    client = bigquery.Client()
    query = "SELECT * FROM `wedding-website2023.backend.gifts`"
    query_job = client.query(query)
    results = query_job.result()
    gifts = [dict(row) for row in results]
    return jsonify(gifts)


if __name__ == "__main__":
    app.run(debug=True)