import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import AppRouting from "./components/Routes/AppRouting";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
