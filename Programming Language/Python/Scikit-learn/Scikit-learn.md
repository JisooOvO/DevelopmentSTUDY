```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 0. 설치 및 Workflow

## 0-1 설치

```
import sklearn
sklearn.__version__
'1.2.2'

import numpy as np
np.__version__
'1.23.5'

import pandas as pd
pd.__version__
'1.5.3'
```

## 0-2 Workflow

![[scikit-learn-workflow.png]]

- `Data Splitting ~ Tunning` 까지의 처리를 `scikit-learn` 라이브러리에서 수행
> `Data Preprocessing`이 가장 중요한 요소

---
# 1. Scikit-learn 

- 머신러닝 알고리즘을 제공(`= estimators`), 데이터에 맞는 메서드를 제공

- `RandomForestClassifier
```
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(random_state=0)

# Data Collections
# x = data
# y = answer
X = [[ 1,  2,  3],  # 2 samples, 3 features
     [11, 12, 13]]
y = [0, 1]  # classes of each sample

# fit
clf.fit(X, y)

# predict
clf.predict(X)
```

---
# 2. Pre-processors

- `StandardScalaer` : 데이터 정규화, 평균과 표준편차 계산
```
from sklearn.preprocessing import StandardScaler

X = [[0, 15],
     [1, -10]]

# scale data according to computed scaling values
# transform 메서드로 데이터 변환
StandardScaler().fit(X).transform(X)

>> array([[-1., 1.], [ 1., -1.]])
```

## 2-1 Pipelines

- Transformer와 estimator가 결합된 형태
```
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# create a pipeline object
pipe = make_pipeline(
    StandardScaler(),
    LogisticRegression()
)

# load the iris dataset and split it into train and test sets
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

# fit the whole pipeline
pipe.fit(X_train, y_train)

# we can now use it like any other estimator
accuracy_score(pipe.predict(X_test), y_test)
```

---
# 3. Model Evaluation

- 5-fold cross-validation
```
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_validate

X, y = make_regression(n_samples=1000, random_state=0)
lr = LinearRegression()
result = cross_validate(lr, X, y)  # defaults to 5-fold CV
result['test_score']  # r_squared score is high because dataset is easy
```

---
# 4. Tuning

## 4-1 Automatic parameter searches

```
# Fetching Data:
from sklearn.datasets import make_regression, fetch_california_housing
X, y = fetch_california_housing(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)

# Defining Parameter Space:
param_distributions = {'n_estimators': randint(1, 5),
                       'max_depth': randint(5, 10)}

# Setting up Randomized Search:
search = RandomizedSearchCV(estimator=RandomForestRegressor(random_state=0),
                            n_iter=5,
                            param_distributions=param_distributions,
                            random_state=0)

# Fitting the Data
search.fit(X_train, y_train)

# Accessing the Best Parameters
search.best_params_

# Using the Search Object as an Estimator:
search.score(X_test, y_test)
```