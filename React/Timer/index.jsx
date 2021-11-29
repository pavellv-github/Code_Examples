import { useEffect, useState } from "react";

export const Timer = ({shoudRun, counter, setCounter, setStart, setStatusRepet}) => {
  const [myInterval, setMyInterval] = useState(null);
  const [counterButtonClick, setCounterButtonClick] = useState(0);

  const startTimer = () => {
    if (counter > 0) {
      const i = setInterval(() => setCounter(state => state - 1), 1000);
      setMyInterval(i);
    } 
  }

  const stopTimer = (myInterval) => {
    clearInterval(myInterval)
  }

  useEffect(() => {
    if (shoudRun && counter === 59) {
      startTimer();
    }
  }, [shoudRun, counter])

  useEffect(() => {
    if (counterButtonClick !== 0 && counterButtonClick >=1 && counter === 0 ) {
      setCounter(59);
    }
  }, [counterButtonClick])

  useEffect(() => {
    if (counter <= 0) {
      stopTimer(myInterval);
      setStart(false)
      setStatusRepet();
    }
  }, [counter])

  if (counter === 0) return <span onClick={() => 
    setStart(true)
  }>Повторить запрос</span>

  return (
    <span>0:{counter < 10 ? `0${counter}` : counter}</span>
  )
}