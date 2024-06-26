# Anecdotes

## Step 1

Add a button to show a random anecdote

**Initial state:**

```js
const [selected, setSelected] = useState(getRandomNumber(anecdotes.length));
```

**Functions:**

- `getRandomNumber(limit)`

```js
function getRandomNumber(limit) {
  return Math.floor(Math.random() * limit);
}
```

- `handleAnecdoteClick()`

```js
function handleAnecdoteClick() {
  let newSelected;

  do {
    newSelected = getRandomNumber(anecdotes.length);
  } while (newSelected === selected);

  setSelected(newSelected);
}
```

**Implement:**

```js
<button onClick={handleAnecdoteClick}>next anecdote</button>
```

## Step 2

Vote for the anecdote shown

**Initial state:**

```js
const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
```

**Functions:**

- `handleVoteClick()`

```js
function handleVoteClick() {
  const newPoints = [...points];
  newPoints[selected] += 1;

  setPoints(newPoints);
}
```

**Implement:**

```js
<div>has {points[selected]} votes</div>
<button onClick={handleVoteClick}>vote</button>
```

## Step 3

Display the most voted anecdote

**Functions:**

- `getBestVotes()`

```js
function getBestVotes() {
  return Math.max(...points);
}
```

- `getMostVoted()`

```js
function getMostVoted() {
  const mostVoted = points.indexOf(getBestVotes());
  return anecdotes[mostVoted];
}
```

**Implement:**

```js
<h2>Anecdote with most votes</h2>
<p>{getMostVoted()}</p>
<p>has {getBestVotes()} votes</p>
```
