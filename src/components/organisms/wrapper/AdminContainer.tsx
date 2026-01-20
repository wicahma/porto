import React from "react";
import { AdminNav } from "../../molecules/navs/AdminNav";

const AdminContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
};

export default AdminContainer;
