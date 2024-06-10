import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const handleGoodClick = () => setGood(good + 1);

  const handleNeutralClick = () => setNeutral(neutral + 1);

  const handleBadClick = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  );
};

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

export default App;
