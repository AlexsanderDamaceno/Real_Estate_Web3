import React from 'react';

const Footer = ({ position }) => {
  return (
    <footer className={`bg-blue-500 text-white text-center ${position} w-full bottom-0`}>
      <p>2024 EtherHomes</p>
    </footer>
  );
};

export default Footer;