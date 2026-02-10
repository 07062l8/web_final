# TastyBase — Fullstack Recipe App

TastyBase is a comprehensive Fullstack Recipe Management application designed to provide a seamless platform for food enthusiasts to discover, share, and organize culinary ideas. The project bridges a modern, responsive frontend with a robust, secure backend to handle real-time data persistence and user interactions.
The core goal of TastyBase is to simplify recipe management through a RESTful architecture. It allows users to go beyond simple browsing by offering a personalized experience where they can contribute to the community and curate their own digital cookbook.

## Links
* **Frontend:** [https://web-final-5d7s.onrender.com/index.html]
* **Backend API:** [https://web-final-5d7s.onrender.com/api]

---

## Tech Stack
* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+), Fetch API.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB Atlas (Cloud).
* **Authentication:** JSON Web Tokens (JWT).
* **Deployment:** Render.

---

## Features
1. **User Authentication:** User Authentication: Secure Sign-up and Login functionality with password encryption and JWT.<img width="1755" height="840" alt="image" src="https://github.com/user-attachments/assets/313ba388-e50f-4ece-8fa4-35959514fa96" />
<img width="1755" height="840" alt="image" src="https://github.com/user-attachments/assets/8b6a05ff-91c7-4642-b000-69611720776a" />

2. **Recipe CRUD:**  Users can Create, Read, Update, and Delete their own recipes.
<img width="1903" height="820" alt="image" src="https://github.com/user-attachments/assets/722c66a4-89b7-4451-a61e-69f09a63c570" />
<img width="1755" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd965cc7-de80-4631-a5f3-cf7aa935ef0b" />
3. **Favorites:** Logged-in users can save recipes to their profile and remove them using a dedicated DELETE method.
<img width="1883" height="847" alt="image" src="https://github.com/user-attachments/assets/15028d35-747d-42b3-8c2e-0c924480ef67" />
<img width="1877" height="848" alt="image" src="https://github.com/user-attachments/assets/5c969cd0-78bb-4d17-b9bb-dad1da561afe" />

4. **Cloud Database:** Real-time data persistence using MongoDB Atlas.
5. **Filtering:** Search and filter recipes by ingredients, name.
<img width="1876" height="937" alt="image" src="https://github.com/user-attachments/assets/a4129522-a17a-4f72-b6f0-3bab4033ab74" />
6. **Admin:** Admin panel for content moderation.
<img width="1755" height="840" alt="image" src="https://github.com/user-attachments/assets/c83aea1b-1e0d-4c5b-9192-b6dc39e5947c" />
<img width="1832" height="672" alt="image" src="https://github.com/user-attachments/assets/384e1cde-f4ec-44b2-88be-633ab4f0527e" />

7. **Interaction:** Likes, comments, and saving recipes to Favorites.
![Uploading image.png…]()


---

## API Endpoints

### Authentication (/api/auth)

| Method | Endpoint   | Description                                      | Auth Required |
|--------|------------|--------------------------------------------------|---------------|
| POST   | /register  | Register a new user (Username, Email, Password)  | No            |
| POST   | /login     | Authenticate user and return JWT token           | No            |
| PUT    | /profile   | Update user display name or email                | Yes           |

### Recipes (/api/recipes)

| Method | Endpoint     | Description                                   | Auth Required |
|--------|--------------|-----------------------------------------------|---------------|
| GET    | /            | Retrieve all recipes                          | No            |
| POST   | /            | Create a new recipe                           | Yes           |
| GET    | /:id         | Get full details of a specific recipe         | No            |
| PUT    | /:id         | Update recipe details (title, ingredients, etc.) | Yes        |
| DELETE | /:id         | Remove a recipe from the database             | Yes           |
| PUT    | /:id/like    | Toggle "Like" status for a recipe             | Yes           |


### Comments (/api/recipes/:id/comments & /api/comments)

| Method | Endpoint        | Description                          | Auth Required |
|--------|-----------------|--------------------------------------|---------------|
| GET    | /:id/comments   | Get all comments for a specific recipe | No            |
| POST   | /:id/comments   | Post a new comment                   | Yes           |
| PUT    | /comments/:id   | Edit an existing comment             | Yes           |
| DELETE | /comments/:id   | Delete a comment                     | Yes           |

### Favorites (/api/favorites)

| Method | Endpoint      | Description                               | Auth Required |
|--------|---------------|-------------------------------------------|---------------|
| GET    | /             | Get the list of the user's favorite recipes | Yes          |
| POST   | /             | Add a recipe to the favorites list        | Yes           |
| DELETE | /:recipeId    | Remove a recipe from favorites            | Yes           |







---

## Local Setup
1. Clone the repository:
   git clone https://github.com/07062l8/web_final.git

2. Install dependencies:
   npm install

3. Configure Environment Variables: Create a `.env` file in the root directory and add:
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key
   PORT=5000

4. Start the server:
   npm start
