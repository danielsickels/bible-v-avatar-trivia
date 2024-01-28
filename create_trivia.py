from pullbible import BibleNames
from pullavatar import AvatarNames

biblical = BibleNames()
avatar = AvatarNames()

biblical_names = biblical.bible_lists()
avatar_names = avatar.avatar_lists()

# Calculate the maximum number of complete sets
max_sets = min(len(biblical_names) // 3, len(avatar_names))

# Pair up each set of three biblical names with one avatar name
paired_names = []
for _ in range(max_sets):
    biblical_set = biblical_names[:3]
    avatar_name = avatar_names.pop(0)
    paired_names.append(biblical_set + [avatar_name])
    # Remove the processed biblical names
    biblical_names = biblical_names[3:]

# Display the result
count = 1
for paired in paired_names:
    print(paired)
    print(count)
    count += 1
