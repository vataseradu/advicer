import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data.slip.advice);
    setAdvice(data.slip.advice);
    setCount((e) => e + 1);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 10);
    document.getElementById("adviceButton").disabled = true;
    setTimeout(function () {
      document.getElementById("adviceButton").disabled = false;
    }, 1000);
  }
  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div class="myApp">
      <h1 className={isVisible ? "visible" : ""}>{advice}</h1>
      <button id="adviceButton" class="button-49" onClick={getAdvice}>
        Get Advice
      </button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
