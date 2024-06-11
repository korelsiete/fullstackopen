import { useState } from "react";
import "./App.css";

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

  function getBestVotes() {
    return Math.max(...points);
  }

  function getMostVoted() {
    const mostVoted = points.indexOf(getBestVotes());
    return anecdotes[mostVoted];
  }

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
      <AnecdoteOfDay
        title="Anecdote of the day"
        content={anecdotes[selected]}
        points={points[selected]}
      />

      <div className="buttons">
        <Button onClick={handleVoteClick} text="Vote" />
        <Button onClick={handleAnecdoteClick} text="Next anecdote" />
      </div>

      <AnecdoteMostVoted
        title="Anecdote with most votes"
        content={getMostVoted()}
        points={getBestVotes()}
      />
    </>
  );
};

const AnecdoteOfDay = ({ title, content, points }) => {
  return (
    <section className="anecdote">
      <h1>{title}</h1>
      <p className="content">{content}</p>
      <span className="points">has {points} votes</span>
    </section>
  );
};

const AnecdoteMostVoted = ({ title, content, points }) => {
  if (!points) return <h2>No votes yet</h2>;

  return (
    <section className="anecdote voted">
      <h2>{title}</h2>
      <p className="content">{content}</p>
      <span className="points voted">has {points} votes</span>
    </section>
  );
};

const Button = ({ onClick, text }) => (
  <button className="main-button" onClick={onClick}>
    {text}
  </button>
);

export default App;
