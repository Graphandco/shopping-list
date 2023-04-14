import "./App.scss";
import AllFoods from "./components/AllFoods";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { FoodsContextProvider } from "./context/FoodsContext";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    return (
        <div className="App">
            <AuthContextProvider>
                <FoodsContextProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list" element={<AllFoods />} />
                    </Routes>
                </FoodsContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
