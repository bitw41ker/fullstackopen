import { useState } from 'react';

function Statistics({ good, neutral, bad }) {
  const feedbackCount = () => good + neutral + bad;
  const average = () => feedbackCount() !== 0 ? (good - bad) / feedbackCount() : 0;
  const positive = () => feedbackCount() !== 0 ? good / feedbackCount() * 100 : 0;
  
  if(good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {feedbackCount()}</p>
        <p>Average: {average()}</p>
        <p>Positive: {positive()} % </p>
      </div>
    )
  }

  return (
    <div>
      <p>No feedback given.</p>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (setFeedbackFunc, current) => () => {
    setFeedbackFunc(current + 1);
  };

  return (
    <div className="App">
      <h1>Give Feedback</h1>

      <button onClick={handleClick(setGood, good)}>good</button>
      <button onClick={handleClick(setNeutral, neutral)}>neutral</button>
      <button onClick={handleClick(setBad, bad)}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
