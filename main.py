# Required Imports
from flask import Flask, Blueprint, send_from_directory, render_template
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)

app = Flask(__name__, static_folder='angular/dist/brightspace_cp')
CORS(app)
angular = Blueprint('angular', __name__,
                    template_folder='angular/dist/brightspace_cp')
app.register_blueprint(angular)


@app.route('/assets/<path:filename>')
def custom_static_for_assets(filename):
    return send_from_directory('angular/dist/brightspace_cp/assets', filename)  


@app.route('/<path:filename>')
def custom_static(filename):
    return send_from_directory('angular/dist/brightspace_cp/', filename)


@app.route('/')
def index():
    return render_template('index.html')
    
if __name__ == '__main__':
    app.run(debug=True)