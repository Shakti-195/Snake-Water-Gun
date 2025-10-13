# flask_app.py
from flask import Flask, render_template, request, jsonify
from game.logic import get_result, get_smart_computer_choice

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/play', methods=['POST'])
def play_game():
    data = request.json
    user_choice = int(data['user_choice'])
    difficulty =  data.get('difficulty','easy')
    history = data.get('history',[])

    # new smart functional call
    computer_choice = get_smart_computer_choice(difficulty,history)
    result = get_result(user_choice, computer_choice)
    
    return jsonify({
        'user_choice': user_choice,
        'computer_choice': computer_choice,
        'result': result
    })
if __name__ == "__main__":
    # For Render / Railway / other hosting platforms
    import os
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
