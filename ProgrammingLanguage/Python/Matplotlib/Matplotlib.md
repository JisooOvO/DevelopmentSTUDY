```table-of-contents
style: nestedList # TOC style (nestedList|inlineFirstLevel)
maxLevel: 0 # Include headings up to the speficied level
includeLinks: true # Make headings clickable
debugInConsole: false # Print debug info in Obsidian console
```
---
# 0. 설치

```
import matplotlib.pyplot as plt
```

---
# 1. Figure 
## 1-1 Figure

![[matplotlib_figure.webp]]

```
fig = plt.figure()  # an empty figure with no Axes
fig, ax = plt.subplots()  # a figure with a single Axes
fig, axs = plt.subplots(2, 2)  # a figure with a 2x2 grid of Axes

# a figure with one axes on the left, and two on the right:
fig, axs = plt.subplot_mosaic([['left', 'right-top'],
                               ['left', 'right_bottom']])
```

## 1-2 Axes

* the plotted data
* axis ticks
* labels
* title
* legend, etc.
```
x = [1, 2, 3, 4]
y = list(zip([1, 4, 2, 3], [2, 3, 4, 6]))

y1 = [1, 4, 2, 3]
y2 = [2, 3, 4, 6]

fig, ax = plt.subplots()  # Create a figure containing a single axes.

ax.plot(x, y1, label='line 1')  # Plot some data on the axes.
ax.plot(x, y2, label='line 2')  # Plot some data on the axes.
ax.set_xlabel('X axis label')
ax.set_ylabel('Y axis label')
ax.set_title('two plots')
ax.legend(loc='upper left')
ax.grid(linestyle='--')
```

## 1-3 Axis

* set the scale 
* limits 
* generate ticks (the marks on the Axis) 
* ticklabels (strings labeling the ticks)

```
ax.set_xticks(np.arange(min(x), max(x)+1, 1))
ax.set_yticks(np.arange(0, 10, 1))
```

```
data1, data2, data3, data4 = np.random.randn(4, 100)
xdata = np.arange(len(data1))  # make an ordinal for this
data = 10**data1

fig, axs = plt.subplots(1, 2, figsize=(5, 2.7), layout='constrained')

axs[0].plot(xdata, data)
axs[0].set_ylim(0, 10**3)

axs[1].set_yscale('log')
axs[1].plot(xdata, data)
```

```
fig, axs = plt.subplots(2, 1, layout='constrained')

axs[0].plot(xdata, data1)
axs[0].set_title('Automatic ticks')

axs[1].plot(xdata, data1)
axs[1].set_xticks(ticks=np.arange(0, 100, 30), labels=['zero', '30', 'sixty', '90'])
axs[1].set_yticks([-1.5, 0, 1.5])  # note that we don't need to specify labels
axs[1].set_title('Manual ticks')
```

### 1-3-1 Locator()

```
ax.xaxis.set_major_locator(MultipleLocator(20))
```

![[matplot_locator.webp]]

## 1-4 Artist

- Format Strings
- marker
- line
- color

### 1-4-1 Object-Oriented(OO) style

```
x = np.linspace(0, 2, 100)  # Sample data.

# Note that even in the OO-style, we use `.pyplot.figure` to create the Figure.
fig, ax = plt.subplots(figsize=(5, 2.7), layout='constrained')
ax.plot(x, x, label='linear')  # Plot some data on the axes.
ax.plot(x, x**2, label='quadratic')  # Plot more data on the axes...
ax.plot(x, x**3, label='cubic')  # ... and some more.
ax.set_xlabel('x label')  # Add an x-label to the axes.
ax.set_ylabel('y label')  # Add a y-label to the axes.
ax.set_title("Simple Plot")  # Add a title to the axes.
ax.legend()  # Add a legend.
```

### 1-4-2 Pyplot-style

```
x = np.linspace(0, 2, 100)  # Sample data.

plt.figure(figsize=(5, 2.7), layout='constrained')
plt.plot(x, x, label='linear')  # Plot some data on the (implicit) axes.
plt.plot(x, x**2, label='quadratic')  # etc.
plt.plot(x, x**3, label='cubic')
plt.xlabel('x label')
plt.ylabel('y label')
plt.title("Simple Plot")
plt.legend()
```

## 1-5 Helper function

```
def my_plotter(ax, data1, data2, param_dict):
    """
    A helper function to make a graph.
    """
    out = ax.plot(data1, data2, **param_dict)
    return out

data1, data2, data3, data4 = np.random.randn(4, 100)  # make 4 random data sets
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(5, 2.7))
my_plotter(ax1, data1, data2, {'marker': 'x'})
my_plotter(ax2, data3, data4, {'marker': 'o'})
```

## 1-6 Chart style

```
names = ['group_a', 'group_b', 'group_c']
values = [1, 10, 100]

plt.figure(figsize=(9, 3))

plt.subplot(131)
plt.bar(names, values)

plt.subplot(132)
plt.scatter(names, values)

plt.subplot(133)
plt.plot(names, values)

plt.suptitle('Categorical Plotting')
```

