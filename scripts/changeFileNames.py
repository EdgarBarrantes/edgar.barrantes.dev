# To be run from main folder.

import os

thoughtsFolder = os.path.abspath("./content/_thoughts/")
tilsFolder = os.path.abspath("./content/_til/")

for fileName in os.listdir(thoughtsFolder):
  source = thoughtsFolder + "/" + fileName
  destination = thoughtsFolder + "/" + fileName.lower().replace(" ", "-")
  os.rename(source, destination)

for fileName in os.listdir(tilsFolder):
  source = tilsFolder + "/" + fileName
  destination = tilsFolder + "/" + fileName.lower().replace(" ", "-")
  os.rename(source, destination)

print("New files: ")
print(os.listdir(thoughtsFolder))
print(os.listdir(tilsFolder))
