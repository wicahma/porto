"use client";
import React from "react";
import LeftCard from "../molecules/blog/LeftCard";
import RightCard from "../molecules/blog/RightCard";

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <LeftCard />
        <RightCard />
      </div>
    </div>
  );
};

export default Blog;
