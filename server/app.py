from flask import Flask, request, jsonify
import os
from user_profile import create_profile, view_profile
from user_relationship import create_relationship, create_relationship_nojson
from memory import create_memory, view_memory, get_memories_person
from tree import return_tree

app = Flask(__name__)


@app.route('/tree', methods=['GET'])
def retrieve_tree_endpoint():
    return jsonify(return_tree()), 200
    

@app.route('/profile/<id>', methods=['GET'])
def view_profile_endpoint(id):
    return jsonify(view_profile(id)), 200

@app.route('/profile', methods=['POST'])
def create_profile_endpoint():
    data = request.json
    id = create_profile(request.json)
    create_relationship_nojson(id, data['p1_id'], data['relation_type'])
    if data['p2_id']:
        create_relationship_nojson(id, data['p2_id'], data['relation_type'])
    return jsonify({'profile_id': id}), 200


@app.route('/relationship', methods=['GET'])
def view_relationship_endpoint():
    pass

@app.route('/relationship', methods=['POST'])
def create_relationship_endpoint():
    data = request.json
    id = create_relationship(data)
    return jsonify({'relation_id': id}), 200

@app.route('/profile/memory/<id>', methods=['GET'])
def get_memories_person_endpoint(id):
    return jsonify(get_memories_person(id)), 200

@app.route('/memory/<id>', methods=['GET'])
def view_memory_endpoint(id):
    return jsonify(view_memory(id)), 200

@app.route('/memory', methods=['POST'])
def create_memory_endpoint():
    data = request.json
    id = create_memory(data)
    return jsonify({'memory_id': id}), 200

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Server is working!'}), 200



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)