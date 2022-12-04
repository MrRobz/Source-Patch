import "./App.css";
import { Routes } from "./components/modules/routes";
import { setupLocalForage } from "./config/setup-local-forage";

setupLocalForage();

function App() {
  return (
    <div className="App h-full bg-neutral-100 p-6 text-base">
      <Routes />
    </div>
  );
}

export default App;
