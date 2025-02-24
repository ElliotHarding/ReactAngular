# Use a Python base image
FROM python:3.9-slim-buster

# Set the working directory
WORKDIR /app

# Copy requirements.txt
COPY python/requirements.txt ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python app
COPY python/ .

# Expose the Flask port
EXPOSE 8000

# Run the Flask app
CMD ["python3", "main.py"]
