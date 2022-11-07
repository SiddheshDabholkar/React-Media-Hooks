import * as React from "react";
import { Camera, Mic, ScreenRecorder } from "./examples";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = React.useState<number>(1);

  const TabData = [
    { id: 1, name: "Camera" },
    { id: 2, name: "MicroPhone" },
    { id: 3, name: "Screen Recorder" },
  ];

  return (
    <div className="container">
      <h1>React Media Hooks</h1>
      <header>
        {TabData.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="tabHead"
          >
            {t.name}
          </button>
        ))}
      </header>
      <div>
        {activeTab === 1 && <Camera />}
        {activeTab === 2 && <Mic />}
        {activeTab === 3 && <ScreenRecorder />}
      </div>
    </div>
  );
}

export default App;
