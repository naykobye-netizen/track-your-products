# Official Python base image
FROM python:3.15-slim

# Working directory inside the container
WORKDIR /app

# Install the system dependencies required to compile packages and connect to PostgreSQL
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install the backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project code to the container
COPY . .

# Expose the port on which Gunicorn will handle requests
EXPOSE 8000