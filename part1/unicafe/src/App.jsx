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
      <Button onClick={handleGoodClick} text="Good" />
      <Button onClick={handleNeutralClick} text="Neutral" />
      <Button onClick={handleBadClick} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <div>
      <h2>Statistics</h2>
      {!total ? (
        <p>No feedback given</p>
      ) : (
        <>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={(total - bad) / total} />
          <StatisticLine text="Positive" value={(good / total) * 100} />
        </>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default App;
