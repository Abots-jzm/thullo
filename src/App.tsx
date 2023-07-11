import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.home} replace />} />
      <Route path={routes.signup} element={<Signup />} />
    </Routes>
  );
}

export default App;
