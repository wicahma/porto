"use client";
import React from "react";
import Container from "./Container";
import LeftCard from "../molecules/about/LeftCard";
import RightCard from "../molecules/about/RightCard";

const AboutPage = () => {
    return (
        <Container
            className="h-[calc(100vh-5rem)] overflow-x-visible"
            classNameLeft="flex flex-col"
            classNameRight="min-w-0 pb-5 grow"
            left={<LeftCard />}
            right={<RightCard />}
        />
    );
};

export default AboutPage;
