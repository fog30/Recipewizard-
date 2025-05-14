from flask import Flask, render_template, request, jsonify
import cohere

app = Flask(__name__)
co = cohere.Client('avzdjjvHdi0TXVKUBzPfRFrzy0WvNw8HuKGkVtLc')  # Replace with your actual API key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_recipe():
    data = request.json
    dish_name = data.get('dish_name')

    user_prompt = f"""
    Give me a recipe for {dish_name} in the following format:

    Title: <Recipe Name>

    Ingredients:
    - item 1
    - item 2
    - item 3

    Instructions:
    1. Step one...
    2. Step two...
    3. Step three...
    """

    response = co.chat(
        model='command-r',
        message=user_prompt,
        temperature=0.7
    )

    return jsonify({'recipe': response.text})

if __name__ == '__main__':
    app.run(debug=True)














