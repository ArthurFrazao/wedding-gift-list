from database import BigQueryClass
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

bigquery = BigQueryClass()

@app.route("/all-gifts", methods=["GET"])
def get_all_gifts():
    results = bigquery.execute_query(query="SELECT * FROM backend.gifts ORDER BY name")
    return jsonify(results)

@app.route("/gifts-not-presented", methods=["GET"])
def get_gifts_not_presented():
    results = bigquery.execute_query(query="SELECT * FROM backend.gifts WHERE is_presented is false ORDER BY name")
    return jsonify(results)

@app.route("/update-gift-status", methods=["POST"])
def update_gift_status():
    if request.json:
        data = request.json
        data["name"] = data["name"].strip().title()
        try:
            bigquery.execute_query(query="UPDATE backend.gifts SET is_presented = true WHERE id = {}".format(
                data["id"]
            ))
            bigquery.execute_query(query="INSERT backend.guests_gifts VALUES({}, '{}')".format(
                data["id"], data["name"]
            ))
            return "Gift status updated successfully", 200
        except:
            return "Failed to update gift status", 500
    else:
        return "No data provided in request body", 400

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response


if __name__ == "__main__":
    app.run(debug=True)