import { Route, Routes } from 'react-router-dom';
import Home from "./views/home"

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home/>}/>
    </Routes>
  );
}

export default App;
