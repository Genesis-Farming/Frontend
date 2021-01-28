import React, { useState } from "react";

import styles from "./FAQ.module.css";

import dataFAQ from "../data/dataFAQ";

export default function FAQ() {
  const [displayAllQuestions, setDisplayAllQuestions] = useState(false);
  const [toggledQuestion, setToggledQuestion] = useState(null);

  return (
    <div className="container">
      <div id={styles.FAQContainer}>
        <h1>FAQ</h1>

        <div style={{ marginBottom: 50 }}>
          {dataFAQ
            .slice(0, displayAllQuestions ? dataFAQ.length : 4)
            .map((item, index) => {
              let isToggled = toggledQuestion == index;

              return (
                <>
                  <div
                    key={index}
                    onClick={() => {
                      setToggledQuestion(isToggled ? null : index);
                    }}
                    className={styles.containerItemQuestion}
                  >
                    <div className={styles.headerItemQuestion}>
                      <h4 style={{ opacity: isToggled ? 1 : 0.5 }}>
                        {item.question}
                      </h4>

                      <img
                        className={styles.iconToggleQuestion}
                        style={{ transform: isToggled && "rotate(1035deg)" }}
                        src={"/UI/toggleQuestion.png"}
                      />
                    </div>

                    {isToggled && <p>{item.answer}</p>}
                  </div>
                  <div className="separatorHorizontal" />
                </>
              );
            })}
        </div>

        <button onClick={() => setDisplayAllQuestions(!displayAllQuestions)}>
          <p style={{ color: "white" }}>{`Show ${
            displayAllQuestions ? "less" : "more"
          } questions`}</p>
        </button>
      </div>
    </div>
  );
}
