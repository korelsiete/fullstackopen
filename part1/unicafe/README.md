# Unicafe

## Step 1

Implement a web application to collect customer feedback

```js
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </>
  );
};
```

## Step 2

**Show more statistics:**

- Total comments collected:

```js
const total = good + neutral + bad;
...
<p>All: {total}</p>
```

- Average score (good: 1, neutral: 0, bad: -1):

```js
<p>Average: {(good - bad) / total}</p>
```

- Percentage of positive comments:

```js
<p>Positive: {(good / total) * 100}%</p>
```

## Step 3

Extract statistics to your own component:

```js
const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {(good - bad) / total}</p>
      <p>Positive: {(good / total) * 100}%</p>
    </div>
  );
};
```

Pass the values:

```js
<Statistics good={good} neutral={neutral} bad={bad} total={total} />
```

## Step 4

Change your app to show statistics only once feedback has been collected:

```js
<div>
  <h2>Statistics</h2>
  {!total ? (
    <p>No feedback given</p>
  ) : (
    <>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {(good - bad) / total}</p>
      <p>Positive: {(good / total) * 100}%</p>
    </>
  )}
</div>
```

## Step 5

Create the following components:

- _Button_: to define the buttons used to send comments

```js
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
```

- _StatisticLine_: to display a single statistic

```js
const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);
```
