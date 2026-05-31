# Task 6 - Performance Optimization

A high-performance REST API built with Node.js, Express, MongoDB and Redis caching, featuring DB indexing and load testing.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (Caching)
- k6 (Load Testing)

## Features

### 1. Redis Caching
- GET requests cached for 60 seconds
- Cache invalidated on POST, PUT, DELETE
- Cache HIT/MISS logging

### 2. DB Indexing
- name field indexed
- price field indexed
- category field indexed

### 3. Load Testing (k6)
- 10 Virtual Users
- 30 seconds duration
- 288 total requests
- 0% failed requests
- Average response time: 56ms

## Load Test Results

| Metric | Value |
|--------|-------|
| Total Requests | 288 |
| Duration | 30s |
| Virtual Users | 10 |
| Avg Response Time | 56ms |
| Min Response Time | 0.66ms |
| Max Response Time | 2.85s |
| Failed Requests | 0% |
| Checks Passed | 98.43% |

## API Endpoints

| Method | Endpoint | Description | Cached |
|--------|----------|-------------|--------|
| GET | /products | Get all products | Yes (60s) |
| GET | /products/:id | Get single product | Yes (60s) |
| POST | /products | Create product | No |
| PUT | /products/:id | Update product | No |
| DELETE | /products/:id | Delete product | No |

## Setup

1. Clone the repository
   git clone https://github.com/ialiasgher75/task6-performance-optimization.git

2. Install dependencies
   npm install

3. Start Redis with Docker
   docker run -d -p 6379:6379 --name redis redis:alpine

4. Create .env file
   PORT=5004
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379

5. Run the server
   npm run dev

## Load Testing

1. Install k6
   winget install k6 --source winget

2. Run load test
   k6 run load-test.js

## How Caching Works

```
First Request:
Client → Server → MongoDB → Response (Cache MISS)
                     ↓
                   Redis (save)

Second Request:
Client → Server → Redis → Response (Cache HIT) ← Fast!
```
