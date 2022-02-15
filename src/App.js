import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
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
