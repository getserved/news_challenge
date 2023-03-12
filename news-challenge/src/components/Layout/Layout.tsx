import React, { FC } from "react";
import Header from "../Header/Header"

interface LayoutProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({
  children
}) => {
  return (
    <React.Fragment>
        <Header />
        {children}
    </React.Fragment>
  );
};

export default Layout;
