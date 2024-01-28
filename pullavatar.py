import random

with open('avatar-names.txt', 'r') as file:
    names_list = file.read().splitlines()

def select_three_random_names(names):
    if len(names) >= 1:
        selected_names = random.sample(names, 1)
        for name in selected_names:
            names.remove(name)
        return selected_names
    else:
        return names

temporarily_stored_names = []

for _ in range(len(names_list) - 1):
    selected_names = select_three_random_names(names_list)
    temporarily_stored_names = selected_names
    print("Selected names:", selected_names)

selected_names = select_three_random_names(names_list)
temporarily_stored_names = selected_names
print("Selected names (after replacement):", selected_names)