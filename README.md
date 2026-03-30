# Task Management API

## Project Overview

This **Task Management API** is designed to manage events for organizations, conferences, or general meetups. It provides endpoints
to CREATE, GET, UPDATE, and DELETE events, including metadata such as capacity, status, and category. The API solves the problem
of manually tracking event details and allows developers to integrate event management into their applications for easy use. 

It is suitable for developers building event management tools, internal company meetings, or scheduling applications. 

---

## Installation Instructions

### Prerequisites

- Node.js **v24.x** or later
- npm **v11.x** or later

### Steps

1. **Clone the repository, install dependencies, configure .env, and run the server**

```bash
# Clone the repository
git clone https://github.com/IvanBanal/COMP-3018-Module-3-5-Assignment
cd COMP-3018-Module-3-5-Assignment
```

```bash
# Install dependencies
npm install
```

```bash
# Copy example environment file
cp .env.example .env
```

```bash
Environment variable setup
Edit .env and set the required variables
Example:
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
SWAGGER_SERVER_URL=http://localhost:3000/api-docs
```

```bash
# Run the server
npm run start
```

```bash
Server runs at: http://localhost:3000/api/v1

Health check endpoint: http://localhost:3000/api/v1/health
```

# API Endpoints

# 1. Create Event
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Tech Conference 2026",
    "date": "2026-06-15T09:00:00Z",
    "capacity": 150,
    "status": "active",
    "category": "conference"
  }'

# Response (201 Created)
# {
#   "message": "Event created",
#   "data": {
#     "id": "event_123abc",
#     "name": "Tech Conference 2026",
#     "date": "2026-06-15T09:00:00Z",
#     "capacity": 150,
#     "registrationCount": 0,
#     "status": "active",
#     "category": "conference",
#     "createdAt": "2026-01-01T10:00:00Z",
#     "updatedAt": "2026-01-01T10:00:00Z"
#   }
# }

# 2. Get All Events
curl -X GET http://localhost:3000/api/v1/events \
  -H "Authorization: Bearer <your-token>"

# Response (200 OK)
# {
#   "message": "Events retrieved",
#   "count": 2,
#   "data": [
#     {
#       "id": "event_123abc",
#       "name": "Tech Conference 2026",
#       "date": "2026-06-15T09:00:00Z",
#       "capacity": 150,
#       "registrationCount": 0,
#       "status": "active",
#       "category": "conference",
#       "createdAt": "2026-01-01T10:00:00Z",
#       "updatedAt": "2026-01-01T10:00:00Z"
#     }
#   ]
# }

# 3. Get Event by ID
curl -X GET http://localhost:3000/api/v1/events/event_123abc \
  -H "Authorization: Bearer <your-token>"

# Response (200 OK)
# {
#   "message": "Event retrieved",
#   "data": {
#     "id": "event_123abc",
#     "name": "Tech Conference 2026",
#     "date": "2026-06-15T09:00:00Z",
#     "capacity": 150,
#     "registrationCount": 0,
#     "status": "active",
#     "category": "conference",
#     "createdAt": "2026-01-01T10:00:00Z",
#     "updatedAt": "2026-01-01T10:00:00Z"
#   }
# }

# 4. Update Event
curl -X PUT http://localhost:3000/api/v1/events/event_123abc \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "Updated Tech Conference",
    "date": "2026-06-20T09:00:00Z",
    "capacity": 200,
    "status": "active",
    "category": "conference"
  }'

# Response (200 OK)
# {
#   "message": "Event updated",
#   "data": {
#     "id": "event_123abc",
#     "name": "Updated Tech Conference",
#     "date": "2026-06-20T09:00:00Z",
#     "capacity": 200,
#     "registrationCount": 0,
#     "status": "active",
#     "category": "conference",
#     "createdAt": "2026-01-01T10:00:00Z",
#     "updatedAt": "2026-01-05T12:00:00Z"
#   }
# }

# 5. Delete Event
curl -X DELETE http://localhost:3000/api/v1/events/event_123abc \
  -H "Authorization: Bearer <your-token>"

# Response (200 OK)
# {
#   "message": "Event deleted"
# }

# API Documentation

Full documentation is available at:
https://github.com/IvanBanal/COMP-3018-Module-3-5-Assignment

Swagger UI (local):
http://localhost:3000/api-docs