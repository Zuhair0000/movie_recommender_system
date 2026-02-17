import pickle
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

try:
  movies_dict = pickle.load(open('app/movies_list.pkl', 'rb'))
  movies = pd.DataFrame(movies_dict)
  similarity = pickle.load(open('app/similarity.pkl', 'rb'))
  print('Model loaded successfully')
except FileNotFoundError:
  print("Error: Model files not fount. check your paths")
  
class MoviesRequest(BaseModel):
  movies_name: str
  
def get_recommendation(movie):
  try:
    movie_index = movies[movies['title'] == movie].index[0]
    
    distances = similarity[movie_index]
    
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    
    recommded_movies = []
    for i in movies_list:
      recommded_movies.append(movies.iloc[i[0]].title)
      
    return recommded_movies
  
  except IndexError:
    return None
    

@app.post('/recommend')
def recommend(request: MoviesRequest):
  recommedations = get_recommendation(request.movies_name)
  
  if recommedations is None:
    raise HTTPException(status_code=404, detail='Movie not found')
  
  return {'movie': request.movies_name, 'recommedations': recommedations}

@app.get('/')
def Home():
  return {'message': "Movie Recommender API is running"}