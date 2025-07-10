# URL Shortener API

A simple REST API that shortens long URLs and returns a short code. When the short code is accessed, it redirects to the original URL.

## Tech Stack

- JavaScript (Node.js)
- Express.js
- MongoDB (Local)
- Mongoose, shortid, validator

## Features

- Shorten long URLs with a unique short code
- Redirect to original URL using short code
- Optional expiry for short URLs
- Analytics to track clicks
- Input validation

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/utkarsh-70/Url-shortener-api.git
cd Url-shortener-api

### 2. Install Dependencies

npm install

### 3. Start MongoDB (if not already running)

mongod

### 4. Run the Server

node index.js

Server will run at: http://localhost:5000

---

## API Endpoints

### POST `/shorten`

**Request Body:**

{
  "url": "https://example.com/very/long/url",
  "expiry": "2025-12-31T23:59:59.000Z"
}

**Response:**

{
  "shortUrl": "http://localhost:5000/lBZVE8Wv8"
}

---

### GET `/:shortId`

Redirects to the original long URL.

Example:

GET http://localhost:5000/lBZVE8Wv8

- If valid: redirects to original URL
- If expired: returns 410 Gone
- If not found: returns 404 Not Found

---

### GET `/analytics/:shortId`

**Response:**

{
  "totalClicks": 2,
  "analytics": [
    { "timestamp": 1720622548012 },
    { "timestamp": 1720622741921 }
  ]
}

---

## Testing with Postman

You can test the following APIs:

1. POST http://localhost:5000/shorten
2. GET http://localhost:5000/:shortId
3. GET http://localhost:5000/analytics/:shortId

(Optional) Save them in a Postman collection and push it to this repo as `postman_collection.json`.

---

## Folder Structure


## Author

Utkarsh Chaubey  
GitHub: https://github.com/utkarsh-70
