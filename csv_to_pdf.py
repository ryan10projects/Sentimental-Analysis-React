import sys
import os
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import pandas as pd
import matplotlib.pylab as plt
from PIL import Image
import numpy as np

directory = sys.argv[1]
parent_dir = "C:/Users/PC/Desktop/react/INVICTUS-S09_FAS/frontend/src/"
present_path = (
    "C:/Users/PC/Desktop/react/INVICTUS-S09_FAS/frontend/src/" + directory + "/"
)
isFile = os.path.isfile(present_path)
if not isFile:
    path = os.path.join(parent_dir, directory)
    print(path)
    os.mkdir(path)


stopwords = set(STOPWORDS)
mask = np.array(Image.open("./white.PNG"))

# we will read the text
data_file = pd.read_csv("./" + sys.argv[1] + ".csv")
# wordcloud
wordcloud = WordCloud(
    stopwords=stopwords,
    width=1600,
    height=800,
    mask=mask,
    background_color="White",
    colormap="Set2",
).generate("".join(data_file["Summary"]))
plt.figure(figsize=(20, 10), facecolor="k")
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.xlabel("X axis label")
plt.ylabel("Y axis label")

plt.title("FeedBack Form Visualization\n Word Cloud", fontsize=50)
plt.tight_layout(pad=0)
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig1.png")
# saving the image of wordcloud
fig = wordcloud
plt.show()

data_file.head(5)
data_file.dropna(axis=1)

plt.title("Figure 1", fontsize=10)
plt.hist(data_file["ans"])
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig2.png")

print(" ")
data_file = data_file.astype(str)
plt.title("Figure 2", fontsize=10)
plt.hist(data_file["ans2"])
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig3.png")

plt.hist(data_file["ans3"])
plt.title("Figure 3", fontsize=10)
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig4.png")

# Index([u'sentence'], dtype='object')

data_file["ans_yes"] = data_file["ans"].str.count("Yes")
data_file["ans_no"] = data_file["ans"].str.count("No")
print(data_file)

l1 = data_file["ans"].value_counts()

# saving the figure

# displaying the figure
import pandas as pd
import matplotlib.pyplot as plt

# Replace below with pd.read_excel() to get your data
df = data_file["ans"]
counts = data_file["ans"].value_counts()
counts.plot.pie(autopct="%.2f%%")
plt.title("Figure 4", fontsize=10)
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig5.png")
plt.show()


from fpdf import FPDF

pdf = FPDF()
imagelist = [
    "./frontend/src/" + sys.argv[1] + "fig1.png",
    "./frontend/src/" + sys.argv[1] + "fig2.png",
    "./frontend/src/" + sys.argv[1] + "fig3.png",
    "./frontend/src/" + sys.argv[1] + "fig4.png",
    "./frontend/src/" + sys.argv[1] + "fig5.png",
]
for image in imagelist:
    pdf.add_page()
    pdf.image(image, 10, 50, 180, 180)
pdf.output("./frontend/src/" + sys.argv[1] + "/survey_feedback.pdf", "F")

df = data_file

# Commented out IPython magic to ensure Python compatibility.
import matplotlib.pyplot as plt
import seaborn as sns

color = sns.color_palette()
# %matplotlib inline
import plotly.offline as py

py.init_notebook_mode(connected=True)
import plotly.graph_objs as go
import plotly.tools as tls
import plotly.express as px

# Product Scores
fig = px.histogram(df, x="Score")
fig.update_traces(
    marker_color="turquoise", marker_line_color="rgb(8,48,107)", marker_line_width=1.5
)
fig.update_layout(title_text="Product Score")
fig.show()


# assign reviews with score > 3 as positive sentiment
# score < 3 negative sentiment
# remove score = 3
df["Score"] = df["Score"].astype(int)
df = df[df["Score"] != 3]
df["sentiment"] = df["Score"].apply(lambda rating: +1 if rating > 3 else -1)

# split df - positive and negative sentiment:
positive = df[df["sentiment"] == 1]
negative = df[df["sentiment"] == -1]

stopwords = set(STOPWORDS)
stopwords.update(["br", "href", "good", "great"])
## good and great removed because they were included in negative sentiment
pos = " ".join(review for review in positive.Summary)
wordcloud2 = WordCloud(stopwords=stopwords).generate(pos)
plt.imshow(wordcloud2, interpolation="bilinear")
plt.axis("off")
plt.show()

neg = " ".join(review for review in negative.Summary)
wordcloud3 = WordCloud(stopwords=stopwords).generate(neg)
plt.imshow(wordcloud3, interpolation="bilinear")
plt.axis("off")
plt.savefig("./frontend/src/" + sys.argv[1] + "/wordcloud33.png")
plt.show()

df["sentimentt"] = df["sentiment"].replace({-1: "negative"})
df["sentimentt"] = df["sentimentt"].replace({1: "positive"})
fig = px.histogram(df, x="sentimentt")
fig.update_traces(
    marker_color="indianred", marker_line_color="rgb(8,48,107)", marker_line_width=1.5
)
fig.update_layout(title_text="Product Sentiment")
fig.show()


def remove_punctuation(text):
    final = "".join(u for u in text if u not in ("?", ".", ";", ":", "!", '"'))
    return final


df["Text"] = df["Text"].apply(remove_punctuation)
df = df.dropna(subset=["Summary"])
df["Summary"] = df["Summary"].apply(remove_punctuation)

dfNew = df[["Summary", "sentiment"]]
dfNew.head()

# random split train and test data
index = df.index
df["random_number"] = np.random.randn(len(index))
train = df[df["random_number"] <= 0.8]
test = df[df["random_number"] > 0.8]

# count vectorizer:
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(token_pattern=r"\b\w+\b")
train_matrix = vectorizer.fit_transform(train["Summary"])
test_matrix = vectorizer.transform(test["Summary"])
all_matrix = vectorizer.transform(data_file["Summary"])

# Logistic Regression
from sklearn.linear_model import LogisticRegression

lr = LogisticRegression()

X_train = train_matrix
X_test = test_matrix
z = all_matrix
y_train = train["sentiment"]
y_test = test["sentiment"]

lr.fit(X_train, y_train)

predictions = lr.predict(X_test)

pred = lr.predict(z)
import seaborn as sns

data_file["Result"] = pred
print(pred)
plt.title("1 = Positive Reviews, -1 = Negative Reviews", fontsize=10)

sns.countplot(pred)
plt.savefig("./frontend/src/" + sys.argv[1] + "/fig6.png")


print(X_test)

print(predictions)


# find accuracy, precision, recall:

from sklearn.metrics import confusion_matrix, classification_report

new = np.asarray(y_test)
confusion_matrix(predictions, y_test)

import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.metrics import plot_confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

X, y = make_classification(random_state=0)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
clf = SVC(random_state=0)
clf.fit(X_train, y_train)

plot_confusion_matrix(clf, X_test, y_test)

plt.title("Figure 3 \n overall feedback \n 0 negative, 1 positive", fontsize=10)

plt.show()


from fpdf import FPDF

pdf = FPDF()
imagelist = [
    "./frontend/src/" + sys.argv[1] + "/fig1.png",
    "./frontend/src/" + sys.argv[1] + "/fig2.png",
    "./frontend/src/" + sys.argv[1] + "/fig3.png",
    "./frontend/src/" + sys.argv[1] + "/fig4.png",
    "./frontend/src/" + sys.argv[1] + "/fig5.png",
    "./frontend/src/" + sys.argv[1] + "/fig6.png",
]
for image in imagelist:
    pdf.add_page()
    pdf.image(image, 10, 50, 180, 180)
pdf.output("./frontend/src/" + sys.argv[1] + "survey_feedback.pdf", "F")
