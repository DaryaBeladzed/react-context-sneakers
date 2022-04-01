import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import SneakersContextProvider from "./store/sneakers-context";

function App() {
  return (
    <SneakersContextProvider>
      <Layout>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
          <Route path={`${process.env.PUBLIC_URL}/favourites`} element={<Favourites />} />
          <Route path={`${process.env.PUBLIC_URL}/orders`} element={<Orders />} />
        </Routes>
      </Layout>
    </SneakersContextProvider>
  );
}

export default App;
