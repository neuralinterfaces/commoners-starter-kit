import os
import json
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def home():
    return jsonify({ "version": sys.version })

@app.route('/users')
@cross_origin()
def users():
    return jsonify([{}, {}, {}])

@app.route('/echo', methods=['POST'])
@cross_origin()
def post():
    return jsonify(json.loads(request.data))

if __name__ == "__main__":
    env_port = os.getenv('PORT')
    PORT = int(env_port) if env_port else 8080
    app.run(host='0.0.0.0', port = PORT)