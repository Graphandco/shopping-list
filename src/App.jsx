import "./App.scss";
import AllFoods from "./components/AllFoods";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { FoodsContextProvider } from "./context/FoodsContext";

function App() {
    return (
        <div className="App">
            <FoodsContextProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<AllFoods />} />
                </Routes>
            </FoodsContextProvider>
        </div>
    );
}

export default App;
