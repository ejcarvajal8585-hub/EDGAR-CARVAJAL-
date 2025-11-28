
import React from 'react';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-400">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;
