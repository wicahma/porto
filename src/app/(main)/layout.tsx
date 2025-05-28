import Navbar from "@/components/molecules/header/Navbar";
import { ILayoutProps } from "@/interface/app/layout";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <main>
            <NextTopLoader height={1} color="#414141" />
            <div className="w-screen overflow-hidden h-screen min-h-screen pt-[5rem]">
                <div className="container mx-auto h-full flex flex-row">
                    <Navbar />
                    {children}
                </div>
            </div>
        </main>
    );
};

export default layout;
