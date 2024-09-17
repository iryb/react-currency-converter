import React from "react";

export const Header = () => {
  return (
    <header className="p-4 border-b bg-slate-100 flex gap-2 justify-between">
      <div className="uppercase font-extrabold text-left">
        <span className="block tracking-widest leading-none">Currency</span>
        <span className="block tracking-wide leading-none">Converter</span>
      </div>
      <div className="">EUR USD</div>
    </header>
  );
};
