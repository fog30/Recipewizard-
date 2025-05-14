document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");
  const input = document.getElementById("dishInput");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dishName = input.value.trim();
    if (!dishName) return;

    resultDiv.innerHTML = "<p><em>Generating recipe...</em></p>";

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ dish_name: dishName })
      });

      const data = await response.json();

      // Format the response nicely
      const formatted = data.recipe
        .replace(/Title:\s*(.*)/i, "<h2>$1</h2>")
        .replace(/Ingredients:\s*/i, "<h3>Ingredients:</h3><ul>")
        .replace(/- (.+)/g, "<li>$1</li>")
        .replace(/Instructions:\s*/i, "</ul><h3>Instructions:</h3><ol>")
        .replace(/\d+\.\s+(.+)/g, "<li>$1</li>") + "</ol>";

      resultDiv.innerHTML = formatted;

    } catch (error) {
      resultDiv.innerHTML = "<p><strong>Error generating recipe. Please try again.</strong></p>";
      console.error("Error:", error);
    }
  });
});
