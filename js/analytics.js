const ctx = document.getElementById('recipeChart').getContext('2d');

// Use localStorage OR fallback to defaultRecipes
let recipes = JSON.parse(localStorage.getItem('recipes'));
if (!recipes || recipes.length === 0) {
  recipes = [
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
}

const categoryCounts = {
  Breakfast: 0,
  Lunch: 0,
  Dinner: 0,
  Desserts: 0,
  Snacks: 0
};

recipes.forEach(recipe => {
  if (categoryCounts.hasOwnProperty(recipe.category)) {
    categoryCounts[recipe.category]++;
  }
});

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Recipes by Category',
      data: Object.values(categoryCounts),
      backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384', '#4bc0c0', '#9966ff'],
      borderColor: '#333',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Recipe Category Distribution' }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});
