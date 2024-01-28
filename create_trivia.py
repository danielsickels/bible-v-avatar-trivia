from pullbible import BibleNames
from pullavatar import AvatarNames

biblical = BibleNames()
avatar = AvatarNames()

biblical_names = biblical.bible_lists()
avatar_names = avatar.avatar_lists()

# Group biblical names into sets of three
biblical_sets = [biblical_names[i:i+3] for i in range(0, len(biblical_names), 3)]

# Pair up each set of three biblical names with one avatar name
paired_names = []
for biblical_set in biblical_sets:
    if avatar_names:
        avatar_name = avatar_names.pop(0)
        paired_names.append(biblical_set + [avatar_name])

# Display the result
count = 1
for paired in paired_names:
    print(paired, count)
    count += 1
