"use client";
import React from "react";
import Container from "./Container";
import LeftCard from "../molecules/experience/LeftCard";
import RightCard from "../molecules/experience/RightCard";

const ExperiencePage = () => {
    return (
        <Container
            className="h-[calc(100vh-5rem)] overflow-x-visible"
            classNameLeft="flex flex-col relative z-50 bg-[var(--background)]"
            classNameRight="min-w-0 grow relative pt-10 pb-14 z-0"
            left={
                <>
                    <LeftCard />
                    <div className="fixed w-[570px] h-screen bg-[var(--background)] left-0 top-0 -z-10" />
                    <div className="fixed w-[570px] h-screen bg-[var(--background)] top-0 -z-10" />
                </>
            }
            right={<RightCard />}
        />
    );
};

export default ExperiencePage;
