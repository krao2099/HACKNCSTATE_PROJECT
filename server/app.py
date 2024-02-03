from flask import Flask, request, jsonify
import os



app = Flask(__name__)


@app.route('/tree', methods=['GET'])
async def retrieve_tree():
    pass



@app.route('/profile', methods=['GET'])
async def view_profile():
    pass

@app.route('/profile', methods=['POST'])
async def create_profile():
    

@app.route('/relationship', methods=['GET'])
async def view_relationship():
    pass

@app.route('/relationship', methods=['POST'])
async def create_relationship():
    pass

@app.route('/memory', methods=['GET'])
async def view_memory():
    pass

@app.route('/relationship', methods=['POST'])
async def create_memory():
    pass

    

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Server is working!'}), 200



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)