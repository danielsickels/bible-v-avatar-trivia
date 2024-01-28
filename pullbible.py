import random

class BibleNames:
    with open('bible-names.txt', 'r') as file:
        names_list = file.read().splitlines()

    @classmethod
    def select_bible_names(cls, names):
        if len(names) >= 3:
            selected_names = random.sample(names, 3)
            for name in selected_names:
                names.remove(name)
            return selected_names
        else:
            return names

    @classmethod
    def bible_lists(cls):
        remaining_names = cls.names_list.copy()
        result = []

        while remaining_names:
            selected_names = cls.select_bible_names(remaining_names)
            result.extend(selected_names)

        return result

biblical = BibleNames
print(biblical.bible_lists())
