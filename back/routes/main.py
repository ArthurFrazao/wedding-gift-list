from database import BigQueryClass
from flask import Flask, jsonify, request, flash
from flask_cors import CORS
from werkzeug.utils import secure_filename
from google.cloud import storage

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"

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

@app.route("/give-suggestion", methods=["POST"])
def give_suggestion():    
    if not request.form:
        return jsonify({"error": "No data provided in request body"}), 400
    data = request.form
    item_name = data["name"].strip().title()
    name_person = data["namePerson"].strip().title()
    this_person_will_gift = True if data["selectedOption"] == "sim" else False
    
    file = request.files["file"]
    if not file.filename:
        flash("No selected file")
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        secure_filename(file.filename)
        storage_client = storage.Client()
        bucket = storage_client.bucket("wedding-website-backend-images")
        blob = bucket.blob(item_name)
        blob.upload_from_file(file)
        blob.make_public()
        update_table_gifts(item_name, blob.public_url, this_person_will_gift)
        if this_person_will_gift:
            update_table_guests_gifts(item_name, name_person)
        return jsonify({"message": "File uploaded"}), 200

def update_table_gifts(item_name: str, file_public_url: str, is_presented: bool):
    query = f"""
    MERGE
        backend.gifts as T
    USING
    (
    SELECT
        MAX(id)+1 as id,
        '{item_name}' as name,
        '{file_public_url}' as image_url,
        {is_presented} as is_presented
    FROM
    backend.gifts
    ) as S
    ON T.name = S.name
    WHEN NOT MATCHED THEN
    INSERT ROW
    """
    bigquery.execute_query(query)

def update_table_guests_gifts(item_name: str, name_person: str):
    query = f"""
    MERGE backend.guests_gifts AS T
    USING (
        select id, '{name_person}'
        from backend.gifts
        where name = '{item_name}'
    ) AS s
    ON T.id_gift = S.id
    WHEN NOT MATCHED THEN
    INSERT ROW
    """
    bigquery.execute_query(query)
    
    
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

@app.route("/get-love-story", methods=["GET"])
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
