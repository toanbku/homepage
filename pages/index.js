import Head from "next/head";
import { useState, useEffect } from "react";
import { PUZZLES } from "../constants/puzzle";

import styles from "../styles/Home.module.css";

const generatePuzzles = () => {
  const puzzles = [...PUZZLES, ...PUZZLES];
  puzzles.sort(() => Math.random() - 0.5);

  return puzzles;
};

const puzzles = generatePuzzles();

export default function Home() {
  const [movement, setMovement] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [successPairs, setSuccessPairs] = useState([]);
  const [isWaiting, setIsWaiting] = useState(true);

  const handleSelectPuzzle = (index, value) => {
    if ([...selectedIndexes, ...successPairs].includes(index)) {
      return;
    }

    if (selectedIndexes.length >= 2) {
      return;
    }

    setSelectedIndexes([...selectedIndexes, index]);
    setSelectedValues([...selectedValues, value]);
  };

  useEffect(() => {
    if (!selectedIndexes.length || selectedIndexes.length === 1) {
      return;
    }

    if (!isWaiting) {
      if (selectedValues[0] === selectedValues[1]) {
        setSuccessPairs([...successPairs, ...selectedIndexes]);
      }

      setMovement(movement + 1);
      setSelectedIndexes(() => []);
      setSelectedValues(() => []);
      setIsWaiting(true);
    } else {
      setTimeout(() => {
        setIsWaiting(false);
      }, 500);
    }
  }, [selectedIndexes, selectedValues, movement, successPairs, isWaiting]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Toan Ho</title>
        <meta name="description" content="Toan Ho's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-center text-4xl font-bold text-green-700 mb-20">
          Welcome to my website!
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <h1>
            Pair matched: {successPairs.length / 2}/{puzzles.length / 2}
          </h1>
          <h1>Total moves: {movement}</h1>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          {puzzles.map((symbol, index) => (
            <button
              className={`${
                [...successPairs, ...selectedIndexes].includes(index)
                  ? "bg-green-400"
                  : ""
              } p-4 bg-transparent border-[2px] border-solid border-gray-400 rounded-md hover:border-green-500 hover:bg-green-500 hover:text-white`}
              key={index}
              onClick={() => handleSelectPuzzle(index, symbol.value)}
            >
              <div className="text-center flex items-center justify-center">
                <span
                  className="text-3xl"
                  role="img"
                  aria-label="snowflake"
                  aria-hidden="false"
                >
                  {[...successPairs, ...selectedIndexes].includes(index)
                    ? symbol.label
                    : "❓"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Powered by Toan Ho</footer>
    </div>
  );
}
