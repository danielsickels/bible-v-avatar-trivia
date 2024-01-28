import random

class AvatarNames:
    with open('avatar-names.txt', 'r') as file:
        names_list = file.read().splitlines()

    @classmethod
    def select_avatar_names(cls, names):
        if len(names) >= 1:
            selected_names = random.sample(names, 1)
            for name in selected_names:
                names.remove(name)
            return selected_names
        else:
            return names

    @classmethod
    def avatar_lists(cls):
        remaining_names = cls.names_list.copy()
        result = []

        while remaining_names:
            selected_names = cls.select_avatar_names(remaining_names)
            result.extend(selected_names)

        return result

avatars = AvatarNames
print(avatars.avatar_lists())
