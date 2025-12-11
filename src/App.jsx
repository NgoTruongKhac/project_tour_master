import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-4xl underline text-primary">
        Welcome to web tour master
      </h1>
    </div>
  );
}

export default App;
