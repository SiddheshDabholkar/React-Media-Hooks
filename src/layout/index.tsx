import React from "react";
import "./index.css";

type LayoutType = {
  name: string;
  buttons: { name: string; onClick: () => void }[];
  rest?: React.ReactNode;
};

const Layout: React.FC<LayoutType> = ({ name, buttons, rest }) => {
  return (
    <div className="layout">
      <h2>{name}</h2>
      <div className="layoutbuttons">
        {buttons.map((l) => (
          <button key={l.name} onClick={l.onClick}>
            {l.name}
          </button>
        ))}
      </div>
      {rest && rest}
    </div>
  );
};

export default Layout;
