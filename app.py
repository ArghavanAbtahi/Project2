import os

import pandas as pd
import numpy as np


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


print("*** Before opening database file")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///airbnb.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
print("***" ) 
print(Base.classes.keys())
# Save references to each table
airbnb= Base.classes.airbnb
airbnb_sqrft= Base.classes.airbnb_sqrft

@app.route("/")
def index():
   """Return the homepage."""
   return render_template("index.html")

@app.route("/airbnb")
def test():
  print("airbnb route reached")
  stmt = db.session.query(airbnb).statement
  print(stmt)
  df = pd.read_sql_query(stmt, db.session.bind)
  print("printing df: ")
  print(df)
  print("preparing to convert df with " + str(len(df)) + " elements to a dictionary")
  data = []
  i = 0
  while i < 50:
    air = {
      # 'neighbourhood':list(df['neighbourhood'])[i],
      # 'neighborhood_overview':list(df['neighborhood_overview'])[i],
      'latitude':list(df['latitude'])[i],
      'longitude':list(df['longitude'])[i],
      'property_type':list(df['property_type'])[i],
      'bathrooms':list(df['bathrooms'])[i],
      'room_type':list(df['room_type'])[i],
      'accommodates':list(df['accommodates'])[i],
      'bedrooms':list(df['bedrooms'])[i],
      'beds':list(df['beds'])[i],
      'price':list(df['price'])[i],
      'number_of_reviews':list(df['number_of_reviews'])[i],
      # 'rating':list(df['rating'])[i]
    }
    data.append(air)
    i+=1

  print("dictionary complete")
  print("preparing to jsonify dictionary")  
  return jsonify(data)

@app.route("/airbnb_sqrft")
def getsquarefoot():
  stmt = db.session.query(airbnb_sqrft).statement
  print(stmt)
  df = pd.read_sql_query(stmt, db.session.bind)
  print("printing df: ")
  print(df)
  data = []
  i = 0
  while i < len(df):
    sqrft = {
      'neighbourhood':list(df['neighbourhood'])[i],
      'neighborhood_overview':list(df['neighborhood_overview'])[i],
      'latitude':list(df['latitude'])[i],
      'longitude':list(df['longitude'])[i],
      'property_type':list(df['property_type'])[i],
      'bathrooms':list(df['bathrooms'])[i],
      'room_type':list(df['room_type'])[i],
      'accommodates':list(df['accommodates'])[i],
      'bedrooms':list(df['bedrooms'])[i],
      'beds':list(df['beds'])[i],
      'square_feet':list(df['square_feet'])[i],
      'price':list(df['price'])[i],
      'number_of_reviews':list(df['number_of_reviews'])[i],
      'review_scores_rating':list(df['review_scores_rating'])[i]
    }
    data.append(sqrft)
    i+=1
  return jsonify(data)

if __name__ == "__main__":
   app.run()