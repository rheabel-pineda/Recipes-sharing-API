Project Title: Recipe Sharing API
Group name: Dambill
Group Members: Erica Ravanera
		   Jennelyn Encarnacion
		   Rheabel Pineda
		   Lyka Murillo
Overview of the project
The Recipe Sharing API project involves the development of a RESTful API to enable users to share their favorite recipes. This project will be accessible to everyone, offering a rich and diverse collection of culinary creations. Users can add new recipes to the system, each including essential details such as a title, a list of ingredients, cooking instructions, and optional tags or categories to help organize the recipes (e.g., Breakfast, Lunch, Dinner, and Dessert). Additionally, users will have the ability to view, edit, and delete their recipes, ensuring a dynamic and user-driven experience.
Purpose
The purpose of the Recipe Sharing API project is to provide a platform where users can share their favorite recipes with others. The project aims to build a RESTful API that allows users to create, manage, view, edit, and delete recipes, including essential details such as titles, ingredients, cooking instructions, and optional tags or categories. This platform encourages collaboration and community engagement by facilitating the exchange of diverse recipes among users.
Features
•	User Authentication: Allow users to create accounts and log in to manage their recipes.
•	Retrieve Recipes by Category: Retrieve all recipes for breakfast, lunch, dinner, and dessert.
•	Retrieve a Specific Recipe: Retrieve a specific recipe by its name or ID.
•	Add a New Recipe: Allow users to add a new recipe to the system.
•	Modify an Existing Recipe: Allow users to modify an existing recipe.
•	Delete a Recipe: Allow users to delete a recipe.
Setup
1. Install all the dependencies (node.js, express.js, uuid).
2. Clone the repository.
3. Run the server by executing the command (node app.js).
4. Utilize API tools like Postman to access the API endpoints.

API Endpoints
•	GET /api/recipes: Retrieve all recipes.
•	GET /api/recipes/:category: Retrieve recipes by category. Replace` :category` with the desired category (e.g.,` /api/recipes/main`).
•	GET /api/recipes/name/:recipeName: Retrieve a recipe by name. Replace `:recipeName` with the desired recipe name (e.g., `/api/recipes/name/Pasta`).
•	GET /api/recipes/id/:recipeId: Retrieve a recipe by ID. Replace `:recipeId` with the desired recipe ID (e.g., `/api/recipes/id/123`).
•	POST /api/recipes: Add a new recipe. Send a JSON object representing the new recipe in the request body.
•	PUT /api/recipes/:recipeId: Edit an existing recipe. Replace `:recipeId` with the ID of the recipe to edit. Send a JSON object representing the updated recipe in the request body.
•	DELETE /api/recipes/:recipeId: Delete a recipe by ID. Replace `:recipeId` with the ID of the recipe to delete.
