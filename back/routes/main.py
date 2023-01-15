from flask import Flask

app = Flask(__name__)

@app.route("/gift-all", methods=["GET"])
def get_gift_all():
    return "teste"

if __name__ == "_main__":
    app.run(host="0.0.0.0")