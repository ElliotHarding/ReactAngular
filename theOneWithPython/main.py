print("Hello, World!")


#def calculator(input):
	
	
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Cannot divide by zero!"
    return x / y
    
def processEquaiton(equation):

	symbol = '+'
	equation = equation.split(symbol)
	print(equation)
	
	for number in equation[:equation.legnth]:
		add(number, "")
	
	index = string.find(symbol)
	
	symbol = '-'
	equation = equation.split(symbol)
	print(equation)
	index = string.find(symbol)
	
	symbol = '*'
	equation = equation.split(symbol)
	print(equation)
	index = string.find(symbol)
	
	symbol = '/'
	equation = equation.split(symbol)
	print(equation)
	index = string.find(symbol)

	return equation

print("Select operation:")
print("1. Add")
print("2. Subtract")
print("3. Multiply")
print("4. Divide")


equationMode = False

if equationMode: 
	while True:
		equation = input("Enter equation: ")
		
		output = processEquaiton(equation)
		
		print(output)
	

while True:
    choice = input("Enter choice(1/2/3/4): ")

    if choice in ('1', '2', '3', '4'):
        try:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            if choice == '1':
                print(num1, "+", num2, "=", add(num1, num2))

            elif choice == '2':
                print(num1, "-", num2, "=", subtract(num1, num2))

            elif choice == '3':
                print(num1, "*", num2, "=", multiply(num1, num2))

            elif choice == '4':
                print(num1, "/", num2, "=", divide(num1, num2))
            
            next_calculation = input("Do you want to do another calculation? (yes/no): ")
            if next_calculation.lower() != "yes":
                break
        except ValueError:
            print("Invalid input. Please enter numbers only.")
    else:
        print("Invalid input. Please select a valid operation.")
