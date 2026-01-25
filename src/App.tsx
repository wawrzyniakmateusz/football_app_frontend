import { Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {League} from "./pages/League.tsx";
import {Fixtures} from "./pages/Fixtures.tsx";



export const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/league/:leagueId" element={<League/>} />
                <Route path="/league/:leagueId/fixtures" element={<Fixtures />} />
            </Routes>
        </div>
    );
}