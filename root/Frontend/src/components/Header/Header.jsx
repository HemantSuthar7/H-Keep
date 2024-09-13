import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <div className='relative'>
      <header className="py-3 px-4 shadow backdrop-blur fixed border-b-2 border-black w-full mb-10 z-40">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <div className="ml-auto lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="#000000"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>

          <ul className={`flex ${mobileMenuOpen ? 'flex-col' : 'hidden'} lg:flex lg:flex-row lg:ml-auto lg:items-center`}>
            {/* Home Button */}
            <li className="mb-2 lg:mb-0 lg:mr-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/Home');
                }}
                className="inline-block px-6 py-2 bg-[#E1DABF] duration-300 hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white"
              >
                Home
              </button>
            </li>

            {/* Login Button (rendered if not authenticated) */}
            {!authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="inline-block px-6 py-2 bg-[#E1DABF] duration-300 hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white"
                >
                  Login
                </button>
              </li>
            )}

            {/* Signup Button (rendered if not authenticated) */}
            {!authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/signup');
                  }}
                  className="inline-block px-6 py-2 bg-[#E1DABF] duration-300 hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white"
                >
                  Signup
                </button>
              </li>
            )}

            {/* Add Note Button (rendered if authenticated) */}
            {authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/AddNote');
                  }}
                  className="px-6 py-2 duration-300 bg-[#E1DABF] hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white flex items-center space-x-2 gap-2"
                >
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-20-80h40v-100h100v-40H740v-100h-40v100H600v40h100v100Z"/></svg>
                  Add Note
                </button>
              </li>
            )}

            {/* Add List Button (rendered if authenticated) */}
            {authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/AddList');
                  }}
                  className="px-6 py-2 duration-300 bg-[#E1DABF] hover:bg-zinc-800 rounded-xl text-black shadow-black shadow-md hover:text-white flex items-center space-x-2 gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#000000"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>
                   Add List
                </button>
              </li>
            )}

            {/* My Notes Button (rendered if authenticated) */}
            {authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/UserNotesAndLists');
                  }}
                  className="inline-block px-6 py-2 bg-[#E1DABF] duration-300 hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white"
                >
                  My Notes
                </button>
              </li>
            )}

            {/* My Labels Button (rendered if authenticated) */}
            {authStatus && (
              <li className="mb-2 lg:mb-0 lg:mr-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/Label');
                  }}
                  className="inline-block px-6 py-2 bg-[#E1DABF] duration-300 hover:bg-zinc-800 rounded-xl text-black shadow-md shadow-black hover:text-white"
                >
                  My Labels
                </button>
              </li>
            )}

            {/* Logout Button (rendered if authenticated) */}
            {authStatus && (
              <li className="lg:ml-4">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
    </div>
  );
}

export default Header;
