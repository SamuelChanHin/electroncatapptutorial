import Mousetrap from "mousetrap";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const { ipcRenderer } = window.require("electron");

const App = () => {
  const [catNum, setCatNum] = useState(1);

  useEffect(() => {
    ipcRenderer.on(`switch-cat`, (event: any, args: any) => {
      setCatNum(args);
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
      <img src={`assets/cat${catNum}.gif`} />
    </h1>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
