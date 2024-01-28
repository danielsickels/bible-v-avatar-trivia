import random

with open('avatar-names.txt', 'r') as file:
    names_list = file.read().splitlines()

def select_avatar_names(names):
    if len(names) >= 1:
        selected_names = random.sample(names, 1)
        for name in selected_names:
            names.remove(name)
        return selected_names
    else:
        return names


def avatar_lists():
    remaining_names = names_list.copy()

    while remaining_names:
        selected_names = select_avatar_names(remaining_names)
        return selected_names
        remaining_names = [name for name in remaining_names if name not in selected_names]

    print("No more names left.")

print(avatar_lists())