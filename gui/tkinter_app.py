import tkinter as tk
from tkinter import messagebox
from game.logic import get_computer_choice, get_result

def play(choice):
    computer = get_computer_choice()
    result = get_result(choice, computer)
    choices = {1: "Snake", -1: "Water", 0: "Gun"}
    messagebox.showinfo("Result", f"You chose {choices[choice]}\nComputer chose {choices[computer]}\n\nYou {result}!")

def run_app():
    root = tk.Tk()
    root.title("Snake Water Gun Game")
    root.geometry("300x200")

    tk.Label(root, text="Choose Snake, Water, or Gun", font=("Arial", 12)).pack(pady=10)
    tk.Button(root, text="Snake", command=lambda: play(1), width=15).pack(pady=5)
    tk.Button(root, text="Water", command=lambda: play(-1), width=15).pack(pady=5)
    tk.Button(root, text="Gun", command=lambda: play(0), width=15).pack(pady=5)

    root.mainloop()
