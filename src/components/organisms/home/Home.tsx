"use client";

import Container from "../Container";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

const HomePage = () => {
    return (
        <Container
            left={<LeftCard />}
            right={<RightCard />}
            classNameRight="w-full relative flex"
        />
    );
};

export default HomePage;
