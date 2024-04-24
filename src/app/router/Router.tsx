import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/index";

import Layout from "../../app/Layout/index";
import Create from "../../pages/Create";

const Router = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Layout>
    </BrowserRouter>
);

export default Router;
