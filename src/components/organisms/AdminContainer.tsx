import React from "react";
import { AdminNav } from "../molecules/admin/AdminNav";

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
