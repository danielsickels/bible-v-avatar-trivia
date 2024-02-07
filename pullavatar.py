import random

with open('avatar-names.txt', 'r') as file:
    names_list = [name.strip() for name in file.read().splitlines()]

def select_avatar_names(names):
    return random.sample(names, 1)

def avatar_lists():
    remaining_names = names_list.copy()
    result = []

    while remaining_names:
        avatar_name = select_avatar_names(remaining_names)
        result.append(avatar_name)
        remaining_names = [name for name in remaining_names if name not in avatar_name[0]]

    return result

def retrieve_avatar():
    selected_lists = avatar_lists()
    return selected_lists
