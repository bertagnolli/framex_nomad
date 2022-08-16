
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAll from "./ListAll";
import './App.css';
//import JsPythonBridge from "./JsPythonBridge";
//import GetDetails from "./GetDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListAll />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
