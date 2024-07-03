Social Media API
================

This project is a RESTful API for a social media platform, allowing users to manage their profiles, thoughts, friends, and reactions.

Features
--------

-   **Users:**

    -   Manage user profiles with unique usernames and emails.
    -   Add friends to a user's friend list.
    -   Update and delete user profiles.
-   **Thoughts:**

    -   Create, update, delete, and retrieve thoughts.
    -   Add and remove reactions to thoughts.

Technologies Used
-----------------

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Insomnia (for API testing)

Getting Started
---------------

To run this project locally, follow these steps:

1.  Clone the repository:

    bash

    `git clone <www.github.com/austintylerallen/socialnet-api>
    cd socialnet-api`

2.  Install dependencies:

    bash

    `npm install`

3.  Set up your environment variables:

    Create a `.env` file in the root directory with the following variables:

    bash

    `PORT=3001
    MONGODB_URI=mongodb://localhost:27017/clusterreps`

4.  Start the server:

    bash

    `npm start`

5.  Use Insomnia or any API testing tool to interact with the endpoints.

API Endpoints
-------------

### Users

-   **GET All Users:**

    -   `GET /api/users`
    -   Retrieve all users.
-   **GET User by ID:**

    -   `GET /api/users/:id`
    -   Retrieve a user by ID.
-   **POST Create User:**

    -   `POST /api/users`
    -   Create a new user.
-   **PUT Update User by ID:**

    -   `PUT /api/users/:id`
    -   Update a user by ID.
-   **DELETE Delete User by ID:**

    -   `DELETE /api/users/:id`
    -   Delete a user by ID.
-   **POST Add Friend to User's Friend List:**

    -   `POST /api/users/:userId/friends/:friendId`
    -   Add a friend to a user's friend list.
-   **DELETE Remove Friend from User's Friend List:**

    -   `DELETE /api/users/:userId/friends/:friendId`
    -   Remove a friend from a user's friend list.

### Thoughts

-   **GET All Thoughts:**

    -   `GET /api/thoughts`
    -   Retrieve all thoughts.
-   **GET Thought by ID:**

    -   `GET /api/thoughts/:id`
    -   Retrieve a thought by ID.
-   **POST Create Thought:**

    -   `POST /api/thoughts`
    -   Create a new thought.
-   **PUT Update Thought by ID:**

    -   `PUT /api/thoughts/:id`
    -   Update a thought by ID.
-   **DELETE Delete Thought by ID:**

    -   `DELETE /api/thoughts/:id`
    -   Delete a thought by ID.
-   **POST Add Reaction to Thought:**

    -   `POST /api/thoughts/:thoughtId/reactions`
    -   Add a reaction to a thought.
-   **DELETE Remove Reaction from Thought:**

    -   `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`
    -   Remove a reaction from a thought.

Walkthrough Video
-----------------

For a detailed demonstration of the API's functionality, watch our walkthrough video provided in the links provided for this assignment.

Contributing
------------

Feel free to contribute to this project by submitting issues or pull requests.
