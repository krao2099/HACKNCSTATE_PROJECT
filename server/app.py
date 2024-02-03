from flask import Flask, request, jsonify
import os
from user_profile import create_profile

app = Flask(__name__)


@app.route('/tree', methods=['GET'])
async def retrieve_tree_endpoint():
    pass



@app.route('/profile', methods=['GET'])
async def view_profile_endpoint():
    pass

@app.route('/profile', methods=['POST'])
async def create_profile_endpoint():
    response = create_profile(request.json)
    return response, 200


@app.route('/relationship', methods=['GET'])
async def view_relationship_endpoint():
    pass

@app.route('/relationship', methods=['POST'])
async def create_relationship_endpoint():
    pass

@app.route('/memory', methods=['GET'])
async def view_memory_endpoint():
    pass

@app.route('/relationship', methods=['POST'])
async def create_memory_endpoint():
    pass

    

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Server is working!'}), 200



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)