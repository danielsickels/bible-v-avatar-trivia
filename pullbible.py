import random

with open('bible-names.txt', 'r') as file:
    names_list = file.read().splitlines()

def select_bible_names(names):
    return random.sample(names, min(3, len(names)))

def bible_lists():
    remaining_names = names_list.copy()
    result = []

    while remaining_names:
        bible_triplet = select_bible_names(remaining_names)
        result.append(bible_triplet)
        remaining_names = [name for name in remaining_names if name not in bible_triplet]

    return result

def retrieve_bibs():
    selected_lists = bible_lists()
    return selected_lists
