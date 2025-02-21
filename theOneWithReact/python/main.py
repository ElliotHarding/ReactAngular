print("Hello, World!")

def calculator(equation):
	result = eval(equation)
	print(result)
	return result
	
from flask import Flask, jsonify, request
from flask_cors import CORS #add CORS
#import some_python_module # your python code.

app = Flask(__name__)
CORS(app) #add cors

@app.route('/api/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    
    print("process_data called: ")
    print(data)
    print(next(iter(data.values())))
    
    result = calculator(next(iter(data.values()))) #call your python function.
    
    print("result: ")
    print(result)
    
    return jsonify(result)
    
@app.route('/api/data')
def get_data():
    data = {"message": "Enter equation"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
