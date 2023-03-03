from database import BigQueryClass
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

"""
The Flask-CORS library is being used to enable access from another domain to the API,
which is useful in scenarios where the application and the client are in different domains.
"""
cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

bigquery = BigQueryClass()


@app.route("/all-gifts", methods=["GET"])
def get_all_gifts():
    try:
        results = bigquery.execute_query(query="SELECT * FROM backend.gifts ORDER BY name")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(results), 200


@app.route("/get-gift-link/<id_gift>", methods=["GET"])
def get_gift_link(id_gift):
    try:
        results = bigquery.execute_query(query=f"SELECT links FROM backend.gift_links WHERE id_gifts = {id_gift}")
        print(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    if not results:
        return jsonify([]), 200
    else:
        return jsonify(results[0]["links"]), 200


@app.route("/get-page-description/<page>", methods=["GET"])
def get_page_description(page):
    try:
        results = bigquery.execute_query(
                query=f"SELECT description FROM backend.pages_description WHERE name = '{page}'")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return results[0]["description"], 200


@app.route("/get-love-story", methods=["GET"])
def get_love_story():
    try:
        results = bigquery.execute_query(
            query="SELECT id, title, FORMAT_DATE('%d/%m/%Y', `date`) as `date`, description, icon_url from backend.love_story_description order by id"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(results), 200


@app.route("/gifts-not-presented", methods=["GET"])
def get_gifts_not_presented():
    try:
        results = bigquery.execute_query(query="SELECT * FROM backend.gifts WHERE is_presented is false ORDER BY name")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(results), 200


@app.route("/guests-representants", methods=["GET"])
def get_guests_representants():
    try:
        results = bigquery.execute_query(
            query="SELECT id, name, invitations FROM backend.guests_representants ORDER BY name")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(results), 200


@app.route("/update-gift-status", methods=["POST"])
def update_gift_status():
    if not request.json:
        return jsonify({"error": "no data provided in request body"}), 400

    try:
        data = request.json
        guest_name = data["name"] = data["name"].strip().title()
        gift_id = data["id"]
    except KeyError as e:
        return jsonify({"error": f"the field {e} is required"}), 400

    try:
        bigquery.execute_query(query=f"UPDATE backend.gifts SET is_presented = true WHERE id = {gift_id}")
        bigquery.execute_query(query=f"INSERT backend.guests_gifts VALUES({gift_id}, '{guest_name}')")
    except Exception as e:
        return jsonify({"error": str(e)}), 50

    return jsonify({"message": "gift status updated successfully"}), 200


@app.route("/confirm-presence", methods=["POST"])
def confirm_presence():
    if not request.json:
        return jsonify({"error": "No data provided in request body"}), 400

    try:
        data = request.json
        id_representant = data["id_representant"]

        for guest in data["names_invitations"]:
            guest_name = guest["name"].strip().title()

            bigquery.execute_query(query="INSERT backend.guests VALUES({}, {}, '{}', {}, {})".format(
                    "(SELECT count(*)+1 from backend.guests)", id_representant, guest_name, guest["age"],
                    guest["is_confirmed"]
            ))

        return jsonify({"message": "Presence confirmed successfully"}), 200
    except KeyError as e:
        return jsonify({"error": f"the field {e} is required"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/give-suggestion", methods=["POST"])
def give_suggestion():
    if not request.json:
        return jsonify({"error": "no data provided in request body"}), 400
    try:
        data = request.json
        product_name = data["name"].strip().title()
        product_url = data["url"].strip()

        query = f"""
        MERGE
            backend.gifts as T
        USING
        (
        SELECT
            MAX(id)+1 as id,
            '{product_name}' as name,
            '{product_url}' as image_url,
            {False} as is_presented
        FROM
        backend.gifts
        ) as S
        ON T.name = S.name
        WHEN NOT MATCHED THEN
        INSERT ROW
        """
        bigquery.execute_query(query)

        return jsonify({"message": "Suggestion confirmed successfully"}), 200

    except KeyError as e:
        return jsonify({"error": f"the field {e} is required"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers[
        "Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, " \
                                          "Authorization"
    return response


if __name__ == "__main__":
    app.run(debug=True)
