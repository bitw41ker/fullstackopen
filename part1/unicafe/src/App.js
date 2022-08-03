import { useState } from 'react';

function Statistics({ good, neutral, bad }) {
  const feedbackCount = () => good + neutral + bad;
  const average = () => feedbackCount() !== 0 ? (good - bad) / feedbackCount() : 0;
  const positive = () => feedbackCount() !== 0 ? good / feedbackCount() * 100 : 0;
  
  if(good > 0 || neutral > 0 || bad > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticLine text={"Good"} value={good}/>
          </tr>
          <tr>
            <StatisticLine text={"Neutral"} value={neutral} />
          </tr>
          <tr>
            <StatisticLine text={"Bad"} value={bad}/>
          </tr>
          <tr>
            <StatisticLine text={"All"} value={feedbackCount()} />
          </tr>
          <tr>
            <StatisticLine text={"Average"} value={average()} />
          </tr>
          <tr>
            <StatisticLine text={"Positive"} value={`${positive()} %`} />
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <p>No feedback given.</p>
    </div>
  );
}

function Button({ setFeedback, feedbackCount, text }) {
  return (
    <div>
      <button onClick={() => setFeedback(feedbackCount + 1)}>{text}</button>
    </div>
  );
}

function StatisticLine({ text, value }) {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button setFeedback={setGood} feedbackCount={good} text={"good"} />
      <Button setFeedback={setNeutral} feedbackCount={neutral} text={"neutral"} />
      <Button setFeedback={setBad} feedbackCount={bad} text={"bad"} />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
