import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(getRandomNumber(anecdotes.length));
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  function getRandomNumber(limit) {
    return Math.floor(Math.random() * limit);
  }

  function handleAnecdoteClick() {
    let newSelected;

    do {
      newSelected = getRandomNumber(anecdotes.length);
    } while (newSelected === selected);

    setSelected(newSelected);
  }

  function handleVoteClick() {
    const newPoints = [...points];
    newPoints[selected] += 1;

    setPoints(newPoints);
  }

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleAnecdoteClick}>next anecdote</button>
    </>
  );
};

export default App;
