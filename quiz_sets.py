from pullbible import retrieve_bibs
from pullavatar import retrieve_avatar
import random

# bring in bible name triplets
bib_triplet = retrieve_bibs()
# bring in avatar names
avatars = retrieve_avatar()

# combine and shuffle an individual bible triplet with one avatar name
quiz_set = []

for x, y in zip(bib_triplet, avatars):
    combined = x + y
    random.shuffle(combined)
    quiz_set.append(combined)

print(quiz_set)