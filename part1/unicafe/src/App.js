import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (setFeedbackFunc, current) => () => {
    setFeedbackFunc(current + 1);
  };

  const feedbackCount = () => good + neutral + bad;
  const average = () => feedbackCount() !== 0 ? (good - bad) / feedbackCount() : 0;
  const positive = () => feedbackCount() !== 0 ? good / feedbackCount() * 100 : 0;

  return (
    <div className="App">
      <h1>Give Feedback</h1>

      <button onClick={handleClick(setGood, good)}>good</button>
      <button onClick={handleClick(setNeutral, neutral)}>neutral</button>
      <button onClick={handleClick(setBad, bad)}>bad</button>

      <h1>Statistics</h1>

      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {feedbackCount()}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} % </p>
    </div>
  );
}

export default App;
