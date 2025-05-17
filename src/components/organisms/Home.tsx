"use client";

import Container from "./Container";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";

const HomePage = () => {
    return (
        <Container
            left={<LeftCard />}
            right={<RightCard />}
            classNameRight="w-full relative flex overflow-hidden"
        />
    );
};

export default HomePage;
