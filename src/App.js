import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import Table from "./Table";
import Edit from "./Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/table/:id/edit" element={<Edit />}></Route>
      </Routes>
    </>
  );
}

export default App;
