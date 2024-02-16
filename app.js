const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const dataFolderPath = path.join(__dirname, 'data');
const recipesFilePath = path.join(dataFolderPath, 'recipes.json');

function authenticateUser(username, password) {
    return username === 'admin' && password === 'admin';
}

function validateUser(req, res, next) {
    const { username, password } = req.headers;

    if (!username || !password) {
        return res.status(401).send('Enter your username and password to verify your identity.');
    }

    if (!authenticateUser(username, password)) {
        return res.status(401).send('Invalid username or password.');
    }

    next();
}

// Route to get all recipes
app.get('/api/recipes', (req, res) => {
    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            const recipes = JSON.parse(data);
            res.json(recipes);
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Route to get recipes by category
app.get('/api/recipes/:category', validateUser, (req, res) => {
    const category = req.params.category.toLowerCase();

    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            const recipes = JSON.parse(data);
            const filteredRecipes = recipes.filter(recipe => recipe.category.toLowerCase() === category);
            res.json(filteredRecipes);
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Route to get a recipe by name
app.get('/api/recipes/name/:recipeName', validateUser, (req, res) => {
    const recipeName = req.params.recipeName;

    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            const recipes = JSON.parse(data);
            const recipe = recipes.find(recipe => recipe.name === recipeName);

            if (!recipe) {
                return res.status(404).send('Recipe not found.');
            }

            res.json(recipe);
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Route to get a recipe by ID
app.get('/api/recipes/id/:recipeId', validateUser, (req, res) => {
    const recipeId = req.params.recipeId;

    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            const recipes = JSON.parse(data);
            const recipe = recipes.find(recipe => recipe.recipeId === parseInt(recipeId));

            if (!recipe) {
                return res.status(404).send('Recipe not found.');
            }

            res.json(recipe);
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Route to delete a recipe by ID
app.delete('/api/recipes/:recipeId', validateUser, (req, res) => {
    const recipeId = req.params.recipeId;

    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            let recipes = JSON.parse(data);
            const recipeIndex = recipes.findIndex(recipe => recipe.recipeId === parseInt(recipeId));

            if (recipeIndex === -1) {
                return res.status(404).send('Recipe not found.');
            }

            recipes.splice(recipeIndex, 1);

            fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 4), (err) => {
                if (err) {
                    console.error('Error writing recipes.json:', err);
                    return res.status(500).send('Error writing recipes.');
                }
                res.status(200).send('Recipe deleted successfully.');
            });
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Route to add a new recipe
app.post('/api/recipes', validateUser, (req, res) => {
    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            const recipes = JSON.parse(data);
            const newRecipe = {
                recipeId: uuidv4(),
                ...req.body
            };
            recipes.push(newRecipe);

            fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 4), (err) => {
                if (err) {
                    console.error('Error writing recipes.json:', err);
                    return res.status(500).send('Error writing recipes.');
                }
                res.status(201).send('Recipe added successfully.');
            });
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

// Edit an existing recipe
app.put('/api/recipes/:recipeId', validateUser, (req, res) => {
    const recipeId = req.params.recipeId;
    const updatedRecipe = req.body;

    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading recipes.json:', err);
            return res.status(500).send('Error reading recipes.');
        }

        try {
            let recipes = JSON.parse(data);
            const recipeIndex = recipes.findIndex(recipe => recipe.recipeId === recipeId);

            if (recipeIndex === -1) {
                return res.status(404).send('Recipe not found.');
            }

            recipes[recipeIndex] = { ...recipes[recipeIndex], ...updatedRecipe };

            fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 4), (err) => {
                if (err) {
                    console.error('Error writing recipes.json:', err);
                    return res.status(500).send('Error writing recipes.');
                }
                res.status(200).send('Recipe updated successfully.');
            });
        } catch (error) {
            console.error('Error parsing recipes.json:', error);
            res.status(500).send('Error parsing recipes.');
        }
    });
});

const PORT = process.env.PORT || 3016;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
