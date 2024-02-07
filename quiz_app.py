# quiz_app.py

from flask import Flask, jsonify, render_template, request
from pullbible import retrieve_bibs
from pullavatar import retrieve_avatar
import random
import os

app = Flask(__name__)

bib_triplet = retrieve_bibs()
avatars = retrieve_avatar()

static_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
app.static_folder = static_dir

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to start the game and fetch the first quiz question
@app.route('/start_game', methods=['POST'])
def start_game():
    # You can perform any setup logic here
    return get_quiz_sets()

# Route to get quiz sets
@app.route('/get_quiz_sets', methods=['GET'])
def get_quiz_sets():
    quiz_set = []
    for index, (x, y) in enumerate(zip(bib_triplet, avatars)):
        combined = x + y
        options = list(combined)
        random.shuffle(options)
        quiz_set.append({'question': f'Question {index + 1}', 'options': options, 'answer': y})

    return jsonify(quiz_set)

# Route to check the answer
@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.json  # Assuming the answer is sent in JSON format
    selected_option = data.get('selected_option')
    correct_answer = data.get('correct_answer')

    # Your logic to check the answer goes here
    is_correct = selected_option == correct_answer
    score = 10 if is_correct else 0

    return jsonify({'is_correct': is_correct, 'score': score})

if __name__ == '__main__':
    app.run(debug=True)
