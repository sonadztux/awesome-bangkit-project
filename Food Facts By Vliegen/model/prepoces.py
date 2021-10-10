import pickle

from sklearn.datasets import load_iris
import tensorflow as tf
from preprocess import MySimpleScaler

scaler = MySimpleScaler()

model=tf.keras.models.load_model('food_predic_10epc_10image.h5')

with open ('preprocessor.pkl', 'wb') as f:
  pickle.dump(scaler, f)