import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamList from "./pages/TeamList";
import NotFound from "./pages/NotFound";
import EditTeam from "./pages/EditTeam";
import AddTeam from "./pages/AddTeam";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TeamList />} />
        <Route path='/add' element={<AddTeam />} />
        <Route path='/edit/:id' element={<EditTeam />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
