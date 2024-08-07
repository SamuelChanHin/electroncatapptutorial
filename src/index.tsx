import Mousetrap from "mousetrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";

const App = () => {
  const [catNum, setCatNum] = useState(1);

  useEffect(() => {
    window.actions.switchCat((num) => {
      setCatNum(num);
    });

    [4, 5, 6].map((num) => {
      Mousetrap.bind([`command+${num}`, `ctrl+${num}`], () => {
        setCatNum(num);
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatNum(Math.ceil(Math.random() * 3));
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <h1>
      123
      <img src={`assets/cat${catNum}.gif`} />
    </h1>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
