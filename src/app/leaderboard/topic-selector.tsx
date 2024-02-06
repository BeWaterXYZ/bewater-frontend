import clsx from "clsx";
import { createContext, useEffect, useState } from "react";

const currentTopic = "text-[#00FFFF]";
const inactiveTopic = "hover:text-gray-300 transition-colors";

const TopicList = [
  "C++",
  "Assembly",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "Java",
  "Solidity",
  "Move",
  "Cairo",
  "Leo",
];

export const TopicContext = createContext("");

export default function TopicSelector(props: {
  onChange: (topic: string) => void;
}) {
  const [selectedTopic, setSelectedTopic] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.onChange(selectedTopic), [selectedTopic]);
  return (
    <div
      id="topic-bar"
      className="flex gap-6 text-sm font-bold leading-5 text-gray-500 cursor-pointer"
    >
      <p
        className={clsx(selectedTopic === "" ? currentTopic : inactiveTopic)}
        onClick={() => setSelectedTopic("")}
      >
        All
      </p>
      {TopicList.map((topic, index) => (
        <p
          key={index}
          className={clsx(
            selectedTopic === topic ? currentTopic : inactiveTopic
          )}
          onClick={() => setSelectedTopic(topic)}
        >
          {topic}
        </p>
      ))}
    </div>
  );
}
