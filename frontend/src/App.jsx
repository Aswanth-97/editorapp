import Register from "./Register";
import Login from "./Login";
import MainBody from "./MainBody";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Missing from "./Missing";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./Unauthorized";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="reg" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={[1000]} />}>
            <Route path="/" element={<MainBody />} />
          </Route>

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
