import random

with open('bible-names.txt', 'r') as file:
    names_list = file.read().splitlines()

def select_bible_names(names):
    if len(names) >= 3:
        selected_names = random.sample(names, 3)
        for name in selected_names:
            names.remove(name)
        return selected_names
    else:
        return names


def bible_list():
    remaining_names = names_list.copy()

    while remaining_names:
        selected_names = select_bible_names(remaining_names)
        return selected_names
        remaining_names = [name for name in remaining_names if name not in selected_names]

    print("No more names left.")

print(bible_list())
