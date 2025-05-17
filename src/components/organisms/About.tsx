"use client";
import React from "react";
import Container from "./Container";
import LeftCard from "../molecules/about/LeftCard";
import RightCard from "../molecules/about/RightCard";

const AboutPage = () => {
    return (
        <Container
            className="h-[calc(100vh-5rem)] overflow-x-visible"
            classNameLeft=" flex flex-col"
            left={<LeftCard />}
            right={<RightCard />}
        />
    );
};

export default AboutPage;
