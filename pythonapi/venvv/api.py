
from flask import Flask
from flask_cors import CORS
from flask import request
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from keras.layers import Dropout
from sklearn.preprocessing import MinMaxScaler


app = Flask(__name__)
CORS(app)
# .\venvv\Scripts\activate
#  python -m flask run






@app.route('/api/ml')
def predict():
    

    hisse_adi = request.args.get('hisse_adi')

    api_url = 'https://query1.finance.yahoo.com/v7/finance/download/{}.IS?period1=1674167002&period2=1705703002&interval=1d&events=history&includeAdjustedClose=true'.format(hisse_adi)
    print(api_url)
    data = pd.read_csv(api_url)


    data.iloc[:, [1]].values

    train_data = data.iloc[:len(data) - 80].copy()
    test_data = data.iloc[len(data) - 80:].copy()

    print(f"train_data.shape: {train_data.shape}")  # (4237, 7)
    print(f"test_data.shape: {test_data.shape}")  # (80, 7)

    train_data

    test_data

    # get high for training
    training_set = train_data.iloc[:, [1]].values.copy()

    # print
    print(f"training_set.shape: {training_set.shape}")  # training_set.shape: (4237, 1)
    print(f"type(training_set): {type(training_set)}\n")  # type(training_set): <class 'numpy.ndarray'>

    training_set



    sc = MinMaxScaler(feature_range=(0, 1))  # make scaler


    def makeSC(sc, data):
        data_scaled = sc.fit_transform(data)  # # to scaler
        return data_scaled  # return


    # make dataset
    training_set_scaled = makeSC(sc, training_set)

    # print
    print(f"training_set_scaled.shape: {training_set_scaled.shape} \n")
    training_set_scaled

    print(training_set_scaled[60])
    print(training_set_scaled[60, 0], "\n")

    print(training_set_scaled[:60, 0], "\n")  # X_train son eleman (i)
    print(training_set_scaled[60, 0])  # y_train 1 elemanı var zaten (i + 1)


    def TimeSeries(step, number, data_scaled):
        X = []
        y = []

        for i in range(step, number):
            X.append(data_scaled[i - step:i, 0])
            y.append(data_scaled[i, 0])

        # list to numpy
        X = np.array(X)  # <class 'numpy.ndarray'>
        y = np.array(y)  # <class 'numpy.ndarray'>

        return X, y


# Parameters
    time_step = 60
    training_set_number = len(training_set_scaled)

# Lists
    X_train = []
    y_train = []

# TimeSeries
    X_train, y_train = TimeSeries(time_step, training_set_number, training_set_scaled)

# print
    print(f"X_train.shape {X_train.shape}")  # X_train.shape (4177, 60)
    print(f"y_train.shape {y_train.shape}")  # y_train.shape (4177,)

    print(X_train[1, :], "\n")
    print(y_train[
          0])  # bu değer X_train[1]'in son değeridir. Eğer ki biz X_train[0,:] yapsaydık, 60 günün baz alarak bir tahmin edecektik, tahminin gerçek değeri de: y_train[0]

# Reshaping
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))

    print(f"X_train.shape {X_train.shape}")  # (4177, 60, 1)
    print(f"y_train.shape {y_train.shape}")  # (4177,).



# Initialising the RNN
    model = Sequential()

# Adding first LSTM layer and Some Dropout
    model.add(LSTM(units=100, return_sequences=True,
               input_shape=(X_train.shape[1], 1)))  # her yeni lstm eklediğimizde return_sequences True olacak
    model.add(Dropout(0.2))  # 0.2 seyrelttik

# Adding Second LSTM layer and Some Dropout
    model.add(LSTM(units=100, return_sequences=True))
    model.add(Dropout(0.2))  # 0.2 seyrelttik

# Adding third LSTM layer and Some Dropout
    model.add(LSTM(units=100))  # yeniden lstm kullanmayacağamız için döndürmeyi kapadık
    model.add(Dropout(0.2))  # 0.2 seyrelttik 44

# adding the output layer
    model.add(Dense(units=1))  # 1 tahmin yapacağımız için

# compile the RNN
    model.compile(optimizer="adam",
              loss="mean_squared_error")

    model.summary()

    history = model.fit(X_train, y_train, epochs=100, batch_size=32)

    test_data

    real_stock_price = test_data.iloc[:, [1]].values
    print(real_stock_price.shape)  # (30, 1)
    real_stock_price

    # tüm değerleri alalım
    total_data = data.iloc[:, [1]]

    print(f"total_data.shape: {total_data.shape}")  # (4317, 1)
    print(f"type(total_data): {type(total_data)}")  # <class 'pandas.core.series.Series'>

    total_data.head()

# test etmek için günleri alalım, 60 günlük hafızayı unutmayın
    inputs = total_data[len(total_data) - len(real_stock_price) - 60:].values  #

    print(type(inputs))  # <class 'numpy.ndarray'>
    print("old shape: ", inputs.shape)  # (90,)

# reshape
    inputs = inputs.reshape(-1, 1)  # (90,1)
    print("new shape: ", inputs.shape)  # (90,)

# scaler
    inputs = sc.transform(inputs)  # just transform, not fit
    inputs[:5]


    def timeSeriesForPredict(step, number, input):
        test = []

        for i in range(step, number):
            test.append(input[i - step: i, 0])

    # list to array
        test = np.array(test)

        return test


    time_step = 60
    number = len(inputs)
    X_test_inputs = []
    inputs = inputs.copy()

# make time series
    X_test_inputs = timeSeriesForPredict(time_step, number, inputs)

    print(type(X_test_inputs))  # <class 'numpy.ndarray'>
    print(X_test_inputs.shape)  # (300, 60)

# reshape
    X_test_res = np.reshape(X_test_inputs, (X_test_inputs.shape[0], X_test_inputs.shape[1], 1))
    print(X_test_res.shape)  # (300, 60, 1)

    predicted_stock_price_scaled = model.predict(X_test_res)
    predicted_stock_price_scaled

    predicted_stock_price = sc.inverse_transform(predicted_stock_price_scaled)
    predicted_stock_price

# Karşılaştırma
    for real, predicted in zip(real_stock_price, predicted_stock_price):
        print(f"real: {real}, predict: {predicted}")


    return {'predictions': [{'real': [r.tolist()], 'predict': [p.tolist()]} for r, p in zip(real_stock_price, predicted_stock_price)]}




    