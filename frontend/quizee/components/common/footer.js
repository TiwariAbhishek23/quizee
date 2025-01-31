import React from 'react';
import Image from 'next/image';
import Logo from '../../app/favicon.ico';

const Footer = () => {
    return (
      <footer className="footer flex flex-col space-y-10 justify-center m-10">
        <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
          <a className="hover:text-gray-900" href="#">
            Home
          </a>
          <a className="hover:text-gray-900" href="#">
            About
          </a>
          <a className="hover:text-gray-900" href="#">
            Services
          </a>
          <a className="hover:text-gray-900" href="#">
            Media
          </a>
          <a className="hover:text-gray-900" href="#">
            Gallery
          </a>
          <a className="hover:text-gray-900" href="#">
            Contact
          </a>
        </nav>

        <div className="flex justify-center space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Logo}
              alt=""
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Logo}
              alt=""
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Logo}
              alt=""
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Logo}
              alt=""
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={Logo}
              alt=""
              width={30}
              height={30}
            />
          </a>
        </div>
        <p className="text-center text-gray-700 font-medium">
          &copy; 2022 Company Ltd. All rights reservered.
        </p>
      </footer>
    );
}

export default Footer;