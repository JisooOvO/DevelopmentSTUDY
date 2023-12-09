```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 0. 설치방법


```
import numpy as np
```

---
# 1. 배열 생성

- `np.array([1,2,3,4,5,6])`
- `np.arrange(4)`
- `np.linspace`
- `np.zeros((x,y))` :  `x by y` 형태의 `0`으로 가득 찬 배열
- `np.ones((2,3))` : `x by y` 형태의 `1`으로 가득 찬 배열
- `np.ones_like(array)` : `array`와 같은 형태의 `1`로 가득 찬 배열
- `np.eye(x, dtype=int)` : `x by x` 형태의 `dtype=int`인  값이 `1`인 diagonal matrix  
- `np.empty`

- `index`로 배열 생성하기
```
label = np.array(['kim', 'lee'])
target = [0,0,0,1,0,1]
label[target]

# array(['kim', 'kim', 'kim', 'lee', 'kim', 'lee'], dtype='<U3')
```

## 1-1 배열 속성

- `shape`
- `ndim` : 차원
- `size`
- `type`
- `dtype`
- `trace`
- `diagonal`
- 
## 1-2 배열 생성 메서드

- `copy`

- `reshape` : 배열의 행렬 변경
![[numpy_shape.png]]

- `ravel` : 다차원 배열을 1차원 배열로 변경

- `flatten`

## 1-3 조건

- `np.where`

## 1-4 슬라이싱 / 인덱싱

- 1차원

- 2차원

---
# 2. 연산

## 2-1 배열의 연산

-  배열의 연산은 브로드캐스팅
```
data = np.ones((2,3)) // [1., 1., 1.], [1., 1., 1.]
data + 1 // [2., 2., 2.], [2., 2., 2.]
```

![[numpy_operation1.png]]
![[numpy_operation2.png]]

## 2-2 집합 연산

- `max(), min(), sum(data, axis)`

![[numpy_aggregation1.png]]

![[numpy_aggregation2.png]]

- `mean()`
- `std()`
- `var()`

- `amax(data, axis), amin(), amax(), argmin(), argmax()` 

## 2-3 Random

- `np.random`
> 파이썬 기본 `random`은 uniform 형태
```
# default_rng : random number generator
np.random.default_rng(seed)

# random 수 제한 -> 0부터 10 사이의 integer
rng_seed.integers(low=0, high=10, size=(3,2)) 
```

- `randn` : dimension 설정

- `randint(start,end,size)` : integer로만 구성

## 2-4 Normal distribution(정규분포)

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\left( -\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^{\!2}\,\right)$$
```
np.random.normal(mu, sigma, size)
```

## 2-5 Dot product

- `A@B`, `A.dot(B)` 또는 `np.matmul(A,B)`

![[numpy_dotproduct.png]]

## 2-6 MeanSquareError

![[numpy_mse.png]]
```
mse = (1/3) * np.sum(np.square(y_prediction - label))
```

