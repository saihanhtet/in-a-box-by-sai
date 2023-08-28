$(window).scroll(function () {
  $("nav").toggleClass("scrolled", $(this).scrollTop() > 0);
  $(".footer").toggleClass("scrolled", $(this).scrollTop() > 0);
});

const jsonData = {
  data: [
    {
      id: 1,
      name: "Honey Mustard-Glazed Salmon",
      image: "recipt-1.avif",
      ingredients: [
        "12 oz. Salmon Fillets",
        "5.47 oz. Long Grain White Rice",
        "1 Yellow Onion",
        "1 oz. Roasted Sliced Almonds",
        "0.88 oz. Balsamic Vinegar",
        "⅗ oz. Butter",
        "½ fl. oz. Honey",
        "1 Tbsp. Grained Dijon Mustard",
        "2 tsp. Mirepoix Broth Concentrate",
        "6 Chive Sprigs",
      ],
      nutrition: [
        {
          Calories: "940",
          Carbohydrates: "83g",
          "Net Carbs": "79g",
          Fat: "41g",
          Protein: "45g",
          Sodium: "1420mg",
        },
      ],
      steps: [
        'Prepare the Ingredients \n Mince chives. \n Halve and peel onion. Cut halves into 1/4" dice. \nPat salmon dry and season flesh side with 1/4 tsp. salt and a pinch of pepper.',
        "Cook the Rice \n Place a medium pot over medium heat. Add butter, onions, and 1/4 tsp. salt to hot pot. Stir occasionally until starting to soften, 2-4 minutes.\nAdd rice and stir occasionally until lightly toasted, 1-2 minutes.\nAdd mirepoix base and 11/4 cups water. Bring to a boil.\nOnce boiling, reduce to a simmer. Cover and cook until rice is tender, 15-18 minutes.\nRemove from burner and fluff with a fork. Stir in almonds and half the chives (reserve 1 tsp. for garnish).\nWhile rice cooks, continue recipe.",
        "Make the Glaze \nIn a microwave-safe bowl, combine 1 Tbsp. balsamic vinegar (remaining is yours to use as you please!), mustard, and honey. Microwave until warmed through, 20-30 seconds.",
        "Cook Salmon and Add Glaze\nPlace a medium non-stick pan over medium heat and add 1 tsp. olive oil.\nAdd salmon, skin-side up, to hot pan and sear until golden-brown and salmon reaches a minimum internal temperature of 145 degrees, 4-6 minutes per side.\nRemove from burner. Carefully drain excess oil from pan. Spoon glaze over salmon.",
        "Finish the Dish\nPlate dish as pictured on front of card, garnishing salmon with reserved chives. Buon appetito!",
      ],
    },
  ],
};

const recipeContainer = document.getElementById("recipeContainer");
const recipeModalLabel = document.getElementById("recipeModalLabel");
const recipeModalImage = document.getElementById("recipeModalImage");
const recipeIngredientsContainer = document.getElementById("recipeIngredients");
const recipeNutritionsContainer = document.getElementById("recipeNutritions");
// Function to render a specific recipe based on its ID
function renderRecipeById(recipeId) {
  const recipeData = jsonData.data.find((recipe) => recipe.id === recipeId);
  // Clear any previous content in the recipeContainer
  recipeContainer.innerHTML = "";
  recipeModalLabel.innerHTML = "";
  recipeIngredientsContainer.innerHTML = "";
  recipeNutritionsContainer.innerHTML = "";
  recipeModalImage.src = "";

  if (recipeData) {
    const recipeCard = document.createElement("div");

    recipeCard.className = "recipe-card";

    recipeModalLabel.innerHTML = recipeData.name; // insert into modal lable

    const ingredientsList = document.createElement("ul");
    recipeData.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    recipeIngredientsContainer.appendChild(ingredientsList);

    const nutritionTable = document.createElement("table");
    const nutritionData = recipeData.nutrition[0];
    for (const nutrient in nutritionData) {
      const row = nutritionTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      cell1.textContent = nutrient;
      cell2.textContent = nutritionData[nutrient];
    }
    recipeNutritionsContainer.appendChild(nutritionTable);

    const stepsList = document.createElement("ol");
    recipeData.steps.forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      stepsList.appendChild(li);
    });
    recipeCard.appendChild(stepsList);

    // Append the recipe card to the recipeContainer
    recipeContainer.appendChild(recipeCard);
    recipeModalImage.src = `static/images/${recipeData.image}`;
  } else {
    // Handle the case where the recipe with the specified ID is not found
    console.error(`Recipe with ID ${recipeId} not found.`);
    recipeModalLabel.innerHTML = `Recipe with ID ${recipeId} not found.`;
    recipeContainer.innerHTML = "404. Not Found";
  }
}

document
  .querySelectorAll('[data-bs-target="#recipeModal"]')
  .forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const id = this.getAttribute("data-recipe-id");
      renderRecipeById(parseInt(id)); // Parse the ID as an integer and render the recipe
    });
  });
