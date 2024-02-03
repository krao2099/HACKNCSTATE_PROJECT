from flask import Flask, request, jsonify
import os
from user_profile import create_profile
from user_relationship import create_relationship, create_relationship_nojson

app = Flask(__name__)


@app.route('/tree', methods=['GET'])
async def retrieve_tree_endpoint():
    pass



# @app.route('/profile', methods=['GET'])
# async def view_profile_endpoint():
#     return jsonify(view_profile(request.data)), 200

@app.route('/profile', methods=['POST'])
async def create_profile_endpoint():
    data = request.json
    id = create_profile(request.json)
    create_relationship_nojson(id, data['p1_id'], data['relation_type'])
    if data['p2_id']:
        create_relationship_nojson(id, data['p2_id'], data['relation_type'])
    return jsonify({'success': 'Created Profile'}), 200


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