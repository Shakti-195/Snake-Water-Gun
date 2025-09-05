# game/logic.py

import random
from collections import Counter

def get_computer_choice():
    """ The original random choice function for 'Easy' mode. """
    return random.choice([-1, 0, 1])  # 1: Snake, -1: Water, 0: Gun

def get_result(user, computer):
    """ The original result function (no changes here). """
    if user == computer:
        return "Draw"
    elif (user == 1 and computer == -1) or (user == -1 and computer == 0) or (user == 0 and computer == 1):
        return "Win"
    else:
        return "Lose"

# NAYI: Smart AI logic
def get_smart_computer_choice(difficulty, history):
    """
    Determines the computer's choice based on difficulty and player's move history.
    history is a list of the player's previous moves, e.g., [1, 0, 1]
    """
    if difficulty == 'easy' or not history:
        return get_computer_choice()

    if difficulty == 'medium': # The Copycat
        # Play the player's last move
        return history[-1]

    if difficulty == 'hard': # The Counter
        # Find the player's most frequent move
        most_common_move = Counter(history).most_common(1)[0][0]
        
        # Now, choose the move that beats the player's most frequent move
        # If player loves Snake (1), computer chooses Gun (0)
        if most_common_move == 1:
            return 0
        # If player loves Water (-1), computer chooses Snake (1)
        elif most_common_move == -1:
            return 1
        # If player loves Gun (0), computer chooses Water (-1)
        else: # most_common_move == 0
            return -1
            
    return get_computer_choice() # Fallback to random