const form = document.getElementById('recipeForm');
const table = document.getElementById('recipeTable').querySelector('tbody');

let defaultRecipes =  [
    { name: 'Pancakes', ingredients: 'Flour, Eggs, Milk', category: 'Breakfast' },
    { name: 'Tacos', ingredients: 'Tortilla, Chicken, Lettuce', category: 'Lunch' },
    { name: 'Ramen', ingredients: 'Noodles, Broth, Fish', category: 'Lunch' },
    { name: 'Cookies', ingredients: 'Butter, Sugar, Flour', category: 'Desserts' },
    { name: 'Smoothie', ingredients: 'Banana, Berries, Yogurt', category: 'Breakfast' },
    { name: 'Burger', ingredients: 'Bun, Patty, Cheese', category: 'Lunch' },
    { name: 'Pizza', ingredients: 'Dough, Tomato, Cheese', category: 'Dinner' },
    { name: 'Brownie', ingredients: 'Chocolate, Eggs, Sugar', category: 'Desserts' },
    { name: 'Nachos', ingredients: 'Chips, Cheese, Jalapeños', category: 'Snacks' },
    { name: 'Fruit Bowl', ingredients: 'Apple, Banana, Mango', category: 'Snacks' }
  ];

let recipes = JSON.parse(localStorage.getItem('recipes')) || defaultRecipes;
let editIndex = -1;

renderTable();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('recipeName').value.trim();
  const ingredients = document.getElementById('ingredients').value.trim();
  const category = document.getElementById('category').value;

  if (!name || !ingredients || !category) return;

  const newRecipe = { name, ingredients, category };

  if (editIndex === -1) {
    recipes.push(newRecipe);
  } else {
    recipes[editIndex] = newRecipe;
    editIndex = -1;
  }

  localStorage.setItem('recipes', JSON.stringify(recipes));
  form.reset();
  renderTable();
});

function renderTable() {
  table.innerHTML = '';
  recipes.forEach((recipe, index) => {
    const row = table.insertRow();
    row.insertCell(0).innerText = recipe.name;
    row.insertCell(1).innerText = recipe.ingredients;
    row.insertCell(2).innerText = recipe.category;
    row.insertCell(3).innerHTML = `
      <button class="btn btn-warning btn-sm me-1" onclick="editRecipe(${index})">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteRecipe(${index})">Delete</button>
    `;
  });
}

window.editRecipe = function (index) {
  const recipe = recipes[index];
  document.getElementById('recipeName').value = recipe.name;
  document.getElementById('ingredients').value = recipe.ingredients;
  document.getElementById('category').value = recipe.category;
  editIndex = index;
}

window.deleteRecipe = function (index) {
  recipes.splice(index, 1);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  renderTable();
}
