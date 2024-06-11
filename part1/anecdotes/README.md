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
