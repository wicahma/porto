import Sidebar from "@/components/molecules/sidebar";
import { ILayoutCMSProps } from "@/interface/app/layout";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const layout: React.FC<ILayoutCMSProps> = ({ children }) => {
    return (
        <>
            <NextTopLoader height={1} color="#414141" />
            <Sidebar />
            {children}
        </>
    );
};

export default layout;
