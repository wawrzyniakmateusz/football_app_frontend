import { Routes, Route, Link, useParams } from "react-router-dom";
import {Home} from "./pages/Home.tsx";


const LeaguePlaceholder = () => {
    const { leagueId } = useParams();
    return (
        <div style={{ padding: 16 }}>
            <h2>Wybrana liga</h2>
            <p>leagueId: {leagueId}</p>
            <p>Tu podłączymy standings / fixtures.</p>
            <Link to="/">← wróć</Link>
        </div>
    );
}

export const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/league/:leagueId" element={<LeaguePlaceholder />} />
            </Routes>
        </div>
    );
}