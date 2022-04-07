import { useState, useEffect } from "react";
import Intro from "./Intro";
import Questions from "./Questions";
import "./App.css";

function App() {
  const [gameSet, setGameSet] = useState(false);
  const [url, setUrl] = useState("");
  const [settings, setSettings] = useState({
    category: "",
    difficulty: "",
  });

  useEffect(() => {
    if (!settings.difficulty && !settings.category) {
      setUrl("https://opentdb.com/api.php?amount=5");
    } else if (!settings.difficulty && settings.category) {
      setUrl(
        `https://opentdb.com/api.php?amount=5&category=${settings.category}`
      );
    } else if (settings.difficulty && settings.category) {
      setUrl(
        `https://opentdb.com/api.php?amount=5&category=${settings.category}&difficulty=${settings.difficulty}`
      );
    }
  }, [settings]);

  return (
    <div className="container">
      {!gameSet && (
        <Intro
          setGameSet={setGameSet}
          settings={settings}
          setSettings={setSettings}
        />
      )}
      {gameSet && <Questions setGameSet={setGameSet} url={url} />}
    </div>
  );
}

export default App;
