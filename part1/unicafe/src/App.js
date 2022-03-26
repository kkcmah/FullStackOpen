import { useState } from 'react'
import Button from './Components/Button'
import Statistics from './Components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => setGood(good + 1);
  const rateNeutral = () => setNeutral(neutral + 1);
  const rateBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={rateGood} text="good"></Button>
      <Button handleClick={rateNeutral} text="neutral"></Button>
      <Button handleClick={rateBad} text="bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App