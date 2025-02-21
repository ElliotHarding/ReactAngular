print("Hello, World!")

def calculator(equation):
	result = eval(equation)
	print(result)
	return result
	
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS #add CORS
import matplotlib.pyplot as plt
import io
import os

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
    
def create_histogram_from_dict(data_dict, title="Histogram"):
    """
    Creates a histogram from the values in a dictionary.

    Args:
        data_dict (dict): A dictionary where values will be used for histogram.
        title (str): The title of the histogram.
    """
    
    
    
    #print("Data dict: ")
    #print(data_dict)
    #print("data_dict.values()")
    #print(data_dict.values())
    #print("list(data_dict)")
    #print(list(data_dict))
    #print("list(data_dict.values())")
    #print(list(data_dict.values()))
    #print("list(data_dict).values()")
    #print(list(data_dict).values())
    
    outer_list = list(data_dict.values())

    if not outer_list or not outer_list[0]:
        print("Dictionary has no values to plot or inner list is empty.")
        return None

    inner_list = outer_list[0]  # Get the inner list of dictionaries
    prices = [item['price'] for item in inner_list]  # Extract prices

    if not prices:
        print("No prices found in the list of dictionaries.")
        return None

    print("Prices:", prices) #Debug line.

    plt.figure(figsize=(10, 6))
    plt.hist(prices, bins='auto', edgecolor='black')
    plt.title(title)
    plt.xlabel("Values")
    plt.ylabel("Frequency")
    plt.grid(True, linestyle='--', alpha=0.6)  # Add a subtle grid
    #plt.show()
    return plt
    
@app.route('/api/createProductDataHistogram', methods=['POST'])
def createProductDataHistogram():
    data = request.get_json()
    
    print("createProductDataHistogram: ")
    print("Data: ")
    print()
    print(data)	
    print()
    
    plt = create_histogram_from_dict(data)
    
    img_buffer = io.BytesIO()
    plt.savefig(img_buffer, format='png')
    img_buffer.seek(0)
    plt.close()
    
    return send_file(img_buffer, mimetype='image/png')
    
@app.route('/api/data')
def get_data():
    data = {"message": "Enter equation"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
