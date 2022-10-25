import "./App.css";

function App() {
  const value = localStorage.getItem("hello");
  localStorage.setItem("hello", "hello");

  return <div className="App bg-neutral-100 p-6 h-full">{value}</div>;
}

export default App;
