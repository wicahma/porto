import Navbar from "@/components/molecules/header/Navbar";
import { ILayoutProps } from "@/interface/app/layout";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <NextTopLoader height={1} color="#414141" />
            <div className="container min-h-screen flex flex-row mx-auto pt-[5rem]">
                <Navbar />
                {children}
            </div>
        </>
    );
};

export default layout;
