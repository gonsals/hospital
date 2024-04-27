import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { Test } from "./Layout.styles";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Test>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/read">Read</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
        </Test>
    );
};

export default Layout;
