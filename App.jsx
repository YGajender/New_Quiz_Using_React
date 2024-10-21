import React, {useState } from "react";
import axios from "axios";

function App() {
  const [queCount, setqueCount] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [Questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrivia = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: queCount,
          category: category,
          difficulty: difficulty,
          type: questionType,
        },
      });
      setQuestions(response.data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTrivia();
  };

  return (
    <>
      <input
        type="number"
        placeholder="How Many Questions"
        value={queCount}
        onChange={(e) => setqueCount(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <div className="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Films</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science & Computers</option>
            <option value="19">Science & Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        <div className="Difficulty">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="Type">
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>
        <button type="submit">Fetch Questions</button>
      </form>

      {loading && <p>Loading questions...</p>}
      {error && <p>Error: {error}</p>}
      {Questions.length > 0 && (
        <div>
          <h1>Questions</h1>
          <ul>
            {Questions.map((question, index) => (
              <li key={index}>
                <strong>{question.category}:</strong> {question.question}
                {question.type === "multiple" && (
                  <ul>
                    {question.incorrect_answers.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                    <li>{question.correct_answer}</li>
                  </ul>
                )}
                {question.type === "boolean" && (
                  <ul>
                    <li>True</li>
                    <li>False</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
