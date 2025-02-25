"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import AudioPlayer from "../AudioPlayer";
import Link from "next/link";

function SongCard({ song }) {
  const [likes, setLikes] = useState(song.likes);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg shadow-lg bg-beige-200">
      <Link
        className="text-2xl font-bold p-4 mx-4 my-16"
        href={{
          pathname: "/song",
        }}
      >
        {song.title}
      </Link>
      {/* Embed Section */}
      <div className="w-full rounded-lg overflow-hidden bg-white">
        <AudioPlayer audioUrl={song.audioFile} />
      </div>

      {/* Content Section */}
      <div className="p-4 relative">
        {/* Title and Date */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">{song.name}</h2>
          <p className="text-gray-500 text-sm">{song.dateMade}</p>
        </div>

        {/* Caption */}
        <p className="text-gray-600 mb-4">{song.caption}</p>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          {/* Likes Section */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLike}
              className={`transition-all duration-100 ease-in text-xl ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
            >
              <FaHeart />
            </button>
            <span className="text-gray-600">{likes}</span>
          </div>

          {/* Genres Section */}
          <div className="flex space-x-2">
            {song.genres.map((genre, index) => (
              <span
                key={index}
                className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
