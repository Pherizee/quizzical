const Intro = (props) => {
  function handleClick() {
    props.setGameSet((prevSet) => !prevSet);
  }

  function handleChange(e) {
    const { name, value, type } = e.target;
    props.setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [name]: value,
      };
    });
  }

  return (
    <div className="intro">
      <h1 className="intro__heading">Quizzical</h1>
      <p className="intro__description">
        Task your brain, test your knowledge...
      </p>
      <div className="category">
        <label htmlFor="category">Select a category</label>
        <select
          name="category"
          id="category"
          value={props.settings.category}
          onChange={handleChange}
        >
          <option value="">Any category</option>
          <option value="9">General Knowledge</option>
          <option value="12">Music</option>
          <option value="11">Film</option>
          <option value="17">Science and Nature</option>
          <option value="18">Computers</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="28">Vehicles</option>
          <option value="26">Celebrities</option>
        </select>
      </div>
      <div className="difficulty">
        <p>Choose difficulty</p>
        {!props.settings.difficulty && (
          <span>
            *not choosing any option will offer all ranges of difficulty
          </span>
        )}
        <div className="diff_options">
          <input
            type="radio"
            name="difficulty"
            id="easy"
            value="easy"
            onChange={handleChange}
            checked={props.settings.difficulty === "easy"}
          />
          <label htmlFor="easy" className="option">
            Easy
          </label>
          <input
            type="radio"
            name="difficulty"
            id="medium"
            value="medium"
            onChange={handleChange}
            checked={props.settings.difficulty === "medium"}
          />
          <label htmlFor="medium" className="option">
            Medium
          </label>
          <input
            type="radio"
            name="difficulty"
            id="hard"
            value="hard"
            onChange={handleChange}
            checked={props.settings.difficulty === "hard"}
          />
          <label htmlFor="hard" className="option">
            Hard
          </label>
        </div>
      </div>
      {
        <button className="btn" onClick={handleClick}>
          Start Quiz
        </button>
      }
    </div>
  );
};

export default Intro;
