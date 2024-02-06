"""
Basic Flask server to serve webpage.
"""

from flask import Flask

HOSTADDR = "localhost"
PORT = 3124

app = Flask(__name__, static_folder="webpage", static_url_path="")
app.config.from_object(__name__)


@app.route("/", methods=["GET"])
def main_page():
    """
    Returns the main page of the application.

    This function sends the static file "index.html" as the main page of the application.

    Returns:
        str: The content of the "index.html" file.
    """
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(host=HOSTADDR, port=PORT, debug=True)
