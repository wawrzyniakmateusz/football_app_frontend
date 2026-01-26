import { Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {League} from "./pages/League.tsx";
import {Fixtures} from "./pages/Fixtures.tsx";
import {FixtureDetails} from "./pages/FixtureDetails.tsx";
import {Team} from "./pages/Team.tsx";





export const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/league/:leagueId" element={<League/>} />
                <Route path="/league/:leagueId/fixtures" element={<Fixtures />} />
                <Route path="/fixture/:fixtureId" element={<FixtureDetails />} />
                <Route path="/team/:teamId" element={<Team />} />
            </Routes>
        </div>
    );
}