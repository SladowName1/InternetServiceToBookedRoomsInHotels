import { BrowserRouter } from "react-router-dom";
import AppRouting from "./components/Routes/AppRouting";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
