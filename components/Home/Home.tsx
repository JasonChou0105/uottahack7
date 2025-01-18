"use client";

import React, { useState, useRef } from "react";
import Result from "./Result/Result";
import GenreList from "./GenreList";

const Home = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // State for user input, selected genres, GPT-4 response, and loading state
  const [formData, setFormData] = useState({
    text: "",
    selectedGenres: [] as string[],
  });
  const [response, setResponse] = useState(""); // To store GPT-4 response
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textAreaRef.current;

    if (textarea) {
      // Reset the height to auto to recalculate
      textarea.style.height = "auto";

      // Calculate and set the new height, with a maximum height for 4 lines
      const maxHeight = 112; // 4 lines x 28px line height
      const newHeight = textarea.scrollHeight;

      if (newHeight <= maxHeight) {
        textarea.style.overflowY = "hidden"; // No scrollbar before 4 lines
      } else {
        textarea.style.overflowY = "auto"; // Enable scrollbar after 4 lines
      }

      textarea.style.height = `${Math.min(newHeight, maxHeight)}px`;
    }

    // Update text in formData
    setFormData((prevState) => ({
      ...prevState,
      text: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Data:", formData);

    // Simulate sending data to GPT-4
    setLoading(true);
    try {
      // Placeholder for GPT-4 API call
      const simulatedResponse = `Response for input: "${
        formData.text
      }" with genres: ${formData.selectedGenres.join(", ")}`;
      setTimeout(() => {
        setResponse(simulatedResponse);
        setLoading(false);
      }, 1000); // Simulate a delay
    } catch (error) {
      console.error("Error fetching GPT-4 response:", error);
      setLoading(false);
    }

    // Clear the formData
    setFormData({
      text: "",
      selectedGenres: [],
    });

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.overflowY = "hidden"; // Reset scrollbar
    }
  };

  const updateSelectedGenres = (updatedGenres: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedGenres: updatedGenres,
    }));
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="block my-4 text-3xl font-bold text-gray-700">
          How Was Your Day?
        </div>
        <div className="bg-beige-200 rounded-3xl shadow-lg w-full flex flex-col items-center justify-center max-w-2xl">
          <form onSubmit={handleSubmit} className="w-full flex max-w-2xl">
            <textarea
              id="textArea"
              ref={textAreaRef}
              value={formData.text}
              onChange={handleInput}
              className="block w-5/6 p-4 text-gray-700 bg-transparent rounded-l-3xl focus:outline-none focus:border-blue-500 resize-none leading-7"
              placeholder="Type something..."
              rows={1}
              style={{ lineHeight: "1.75rem" }}
            ></textarea>
            <button
              type="submit"
              className="transition-all ease-in duration-300 w-1/6 m-2 text-black bg-beige-300 rounded-3xl hover:bg-beige-400 focus:outline-none shadow-md"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </form>
          <div className="w-full px-4 pb-2 flex max-w-2xl">
            <GenreList
              selectedGenres={formData.selectedGenres}
              setSelectedGenres={updateSelectedGenres}
            />
          </div>
        </div>
        {response && (
          <div className="mt-4 text-lg text-gray-700">
            <strong>Response:</strong> {response}
          </div>
        )}
      </div>
      <Result />
    </div>
  );
};

export default Home;
