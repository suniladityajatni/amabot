from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from bs4 import BeautifulSoup
import re
# as per recommendation from @freylis, compile once only
CLEANR = re.compile('<.*?>') 

def cleanhtml(raw_html):
  cleantext = re.sub(CLEANR, '', raw_html)
  return cleantext



from transformers import pipeline
qa_model = pipeline("question-answering",   model= "deepset/minilm-uncased-squad2")


class Data(BaseModel):
    text: str
    question:str

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"greetings":"Welcome"}

@app.post("/")
def query(data:Data):
    text=data.text
    question=data.question
    cleantext = cleanhtml(text)
    print(cleantext)
    # question = "Where do I live?"
    # context = "My name is Merve and I live in İstanbul."
    tempAns=qa_model(question = question, context = cleantext)
    answer=tempAns["answer"]
    confidence=tempAns["score"]
    confidence=str(round(confidence*100, 2))
    return {"answer":answer,"confidence":confidence}