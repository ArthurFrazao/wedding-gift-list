from database import BigQueryClass
from flask import Flask, jsonify, request, flash
from flask_cors import CORS
from flask_caching import Cache
from werkzeug.utils import secure_filename
import os
from google.cloud import storage

UPLOAD_FOLDER = "gs://wedding-website-backend-images-upload"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

cache = Cache(app, config={"CACHE_TYPE": "simple"})

"""
The Flask-CORS library is being used to enable access from another domain to the API,
which is useful in scenarios where the application and the client are in different domains.
"""
cors = CORS(app, resources={"*": {"origins": "http://localhost:port"}})

bigquery = BigQueryClass()

class APIError(Exception):
    """All custom API Exceptions"""
    pass

class APIPresenceError(APIError):
    """Custom Presence Confirmation Error Class."""
    code = 409
    description = "Presence Confirmation Error"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
@app.route("/give_suggestion", methods=["POST"])
def give_suggestion():
    
    print(f"name: {request.json['name']}")
    print(f"namePerson: {request.json['namePerson']}")
    file = request.files["file"]
    if not file.filename:
        flash("No selected file")
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        storage_client = storage.Client()
        bucket = storage_client.bucket("wedding-website-backend-images-upload")
        blob = bucket.blob(filename)
        blob.upload_from_file(file)
        return jsonify({"message": "File uploaded"}), 200

@app.route("/all-gifts", methods=["GET"])
@cache.cached(timeout=60)
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
@cache.cached(timeout=300)
def get_page_description(page):
    """
    Retrieves the description of a given page from the backend.pages_description table in BigQuery.

    Parameters:
        - page (str): the name of the page to retrieve the description for. Accepted values are "gift-list",
          "confirm-presence", and "home".

    Returns:
        A tuple containing the description string and an HTTP status code. If the query was successful, the
        description string is returned along with a 200 status code. If an error occurred during the query,
        a tuple containing an error message string and a 500 status code is returned.
    """
    try:
        results = bigquery.execute_query(query=f"SELECT description FROM backend.pages_description WHERE name = '{page}'")
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return results[0]["description"], 200

@app.route("/get-love-story", methods=["GET"])
@cache.cached(timeout=300)
def get_love_story():
    try:
        results = bigquery.execute_query(
            query="SELECT id, title, `date`, description, icon_url from backend.love_story_description order by id"
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
        is_confirmed = data["is_confirmed"]
        phone_number = data["phone_number"]
        phone_number_formatted = int("".join(filter(str.isdigit, phone_number)))
        optional_message = data["optional_message"]
        
        query_check_presence = f"""
        select id_representant
        from backend.confirmed_presence
        where id_representant = {id_representant} """
        
        presence_exists = bigquery.execute_query(query=query_check_presence)
        
        if not presence_exists:        
            query_confirm_presence = f"""
            INSERT backend.confirmed_presence (id_representant, is_confirmed, phone_number, option_message)
            SELECT {id_representant}, {is_confirmed}, {phone_number_formatted}, NULLIF('{optional_message}', '')
            """
            bigquery.execute_query(query=query_confirm_presence)

            return jsonify({"message": "Presence confirmed successfully"}), 200
        else:
            raise APIPresenceError("Presence already confirmed")
    except KeyError as e:
        return jsonify({"error": f"the field {e} is required"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route("/give-suggestion", methods=["POST"])
# def give_suggestion():
#     if not request.json:
#         return jsonify({"error": "no data provided in request body"}), 400
#     try:
#         data = request.json
#         product_name = data["name"].strip().title()
#         product_url = data["url"].strip()

#         query = f"""
#         MERGE
#             backend.gifts as T
#         USING
#         (
#         SELECT
#             MAX(id)+1 as id,
#             '{product_name}' as name,
#             '{product_url}' as image_url,
#             {False} as is_presented
#         FROM
#         backend.gifts
#         ) as S
#         ON T.name = S.name
#         WHEN NOT MATCHED THEN
#         INSERT ROW
#         """
#         bigquery.execute_query(query)

#         return jsonify({"message": "Suggestion confirmed successfully"}), 200

#     except KeyError as e:
#         return jsonify({"error": f"the field {e} is required"}), 400
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

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
