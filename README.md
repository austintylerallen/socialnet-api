# Social Network API

This project is a social network API built with Express.js, MongoDB, and Mongoose. The API allows users to share their thoughts, react to friends' thoughts, and manage their friend list. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Seeding the Database](#seeding-the-database)
- [License](#license)

## Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/austintylerallen/socialnet-api.git
    ```

2. Navigate to the project directory:
    ```sh
    cd socialnet-api
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Set up your `.env` file with the following variable:
    ```sh
    MONGODB_URI=mongodb://localhost:27017/clusterreps
    ```

## Usage

1. Start the MongoDB server (if not already running):
    ```sh
    mongod --config /opt/homebrew/etc/mongod.conf
    ```

2. Seed the database with initial data:
    ```sh
    node seeds/seed.js
    ```

3. Start the Express server:
    ```sh
    npm start
    ```

4. Access the API at `http://localhost:3001/api`.

## API Endpoints

### Users

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:userId` - Get a single user by ID
- **POST** `/api/users` - Create a new user
    ```json
    {
      "username": "new_user",
      "email": "new_user@example.com"
    }
    ```
- **PUT** `/api/users/:userId` - Update a user by ID
- **DELETE** `/api/users/:userId` - Delete a user by ID

### Thoughts

- **GET** `/api/thoughts` - Get all thoughts
- **GET** `/api/thoughts/:thoughtId` - Get a single thought by ID
- **POST** `/api/thoughts` - Create a new thought
    ```json
    {
      "thoughtText": "This is a new thought",
      "username": "user_username"
    }
    ```
- **PUT** `/api/thoughts/:thoughtId` - Update a thought by ID
- **DELETE** `/api/thoughts/:thoughtId` - Delete a thought by ID

### Friends

- **POST** `/api/users/:userId/friends/:friendId` - Add a friend
- **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend

### Reactions

- **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Data Models

### User

```json
{
  "username": "String (unique, required)",
  "email": "String (unique, required, must match a valid email address)",
  "thoughts": ["Array of _id values referencing the Thought model"],
  "friends": ["Array of _id values referencing the User model (self-reference)"]
}
