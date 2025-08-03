import { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // Use state to manage the current theme, defaulting to 'light'
  const [theme, setTheme] = useState('light');

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Define SVG icons for the toggle switch
  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4.93 19.07l1.41-1.41" />
      <path d="M17.66 6.34l1.41-1.41" />
    </svg>
  );

  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  return (
    // Main container. Apply dark mode classes conditionally.
    // The 'transition-colors' class provides a smooth visual change.
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-500`}>
      
      {/* Header section */}
      <header className={`p-4 md:p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hey there!, I am Ayush</h1>
          
          {/* Theme switch button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
              ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-200'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      {/* Main content section */}
      <main className="container mx-auto p-4 md:p-8">
        
        {/* Hero section */}
        <section className={`p-6 md:p-10 rounded-lg shadow-xl mb-8
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Welcome to our platform</h2>
          <p className="text-base md:text-lg">
            This is a simple, beautiful, and responsive web page showcasing a dark and light theme switch built with React and Tailwind CSS. Explore the different sections below.
          </p>
        </section>

        {/* Features section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Feature Card 1 */}
          <div className={`p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl font-semibold mb-2">Responsive Design</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              The layout adapts perfectly to any screen size, from mobile phones to large desktop monitors.
            </p>
          </div>
          
          {/* Feature Card 2 */}
          <div className={`p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl font-semibold mb-2">React & Tailwind</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Built using a modern tech stack for a fast, component-based, and highly maintainable application.
            </p>
          </div>
          
          {/* Feature Card 3 */}
          <div className={`p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg
            ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl font-semibold mb-2">Beautiful Themes</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Easily toggle between a sleek dark theme and a clean light theme for a personalized experience.
            </p>
          </div>

        </section>

      </main>

      {/* Footer section */}
      <footer className={`p-4 md:p-6 text-center text-sm
        ${theme === 'dark' ? 'text-gray-400 border-t border-gray-800' : 'text-gray-500 border-t border-gray-300'}`}>
        <p>&copy; 2025 My Sample Page. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
