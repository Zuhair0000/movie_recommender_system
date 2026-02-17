# 🎬 CineMatch AI: Content-Based Movie Recommender System

A full-stack machine learning application that provides personalized movie recommendations. 

Unlike simple collaborative filtering, **CineMatch AI** uses a **Content-Based Filtering** engine. It analyzes the "DNA" of a movie (plot summaries, genres, cast, crew, and keywords) to find mathematical similarities between films, making it effective even for users with no previous watch history (solving the "Cold Start" problem).

<img width="1039" height="588" alt="image" src="https://github.com/user-attachments/assets/6f46fc25-fc7c-41ac-961c-62982ee0af59" />


## 🚀 Key Features
* **ML Engine:** Uses **TF-IDF Vectorization** and **Cosine Similarity** to compute movie relationships in a 5,000-dimensional vector space.
* **High-Performance API:** Powered by **FastAPI** for asynchronous, low-latency (<50ms) inference serving.
* **Model Persistence:** Implements efficient serialization (pickling) to load pre-computed similarity matrices instantly on startup.
* **Modern Frontend:** A responsive, "cinematic" UI built with **React.js (Vite)** and **Tailwind CSS**.
* **Robust Data Pipeline:** Custom preprocessing pipeline to clean and unify complex JSON metadata from the TMDB 5000 dataset.

## 🛠️ Tech Stack

### Machine Learning & Data Science
* **Python:** Core logic and data processing.
* **Pandas & NumPy:** Data manipulation and vector operations.
* **Scikit-Learn:** `CountVectorizer` for text feature extraction and `cosine_similarity` for distance calculation.
* **NLTK:** Natural Language Processing (stemming/tokenization).

### Backend Engineering
* **FastAPI:** Modern, high-performance web framework for building APIs.
* **Uvicorn:** ASGI server for production-grade performance.
* **Pydantic:** Data validation and settings management using Python type hints.

### Frontend Engineering
* **React.js (Vite):** Component-based UI library.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI design.
* **Axios:** Promise-based HTTP client for the browser.
* **Lucide React:** Iconography.

## 🧠 How It Works (The Algorithm)

1.  **Data Ingestion:** Merges `tmdb_5000_movies.csv` and `tmdb_5000_credits.csv`.
2.  **Feature Engineering:** * Extracts top 3 actors, director, genres, and keywords from JSON columns.
    * Combines all text features into a single "tag" string for each movie.
3.  **Vectorization:** Converts text tags into numerical vectors using a **Bag-of-Words** model (5,000 most frequent words).
4.  **Similarity Matrix:** Calculates the **Cosine Similarity** between every pair of movies.
    * *Result:* A 4806x4806 matrix representing the "distance" between any two movies.
5.  **Inference:**
    * User inputs a movie title.
    * System looks up the movie's vector index.
    * Sorts all other movies by similarity score (descending).
    * Returns the top 5 matches via the API.
