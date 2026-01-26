import { Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {League} from "./pages/League.tsx";
import {Fixtures} from "./pages/Fixtures.tsx";
import {FixtureDetails} from "./pages/FixtureDetails.tsx";
import {Team} from "./pages/Team.tsx";
import {AppLayout} from "./layouts/AppLayout.tsx";





export const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AppLayout><Home /></AppLayout>} />
                <Route path="/league/:leagueId" element={<AppLayout><League /></AppLayout>} />
                <Route path="/league/:leagueId/fixtures" element={<AppLayout><Fixtures /></AppLayout>} />
                <Route path="/fixture/:fixtureId" element={<AppLayout><FixtureDetails /></AppLayout>} />
                <Route path="/team/:teamId" element={<AppLayout><Team /></AppLayout>} />
            </Routes>
        </div>
    );
}