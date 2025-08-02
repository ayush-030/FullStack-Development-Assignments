import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function ProfileCard() {
  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className="relative h-32 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=500&q=80')"
          }}
        />
      </div>
      <div className="flex flex-col items-center p-6 -mt-16">
        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-300 dark:bg-gray-600">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/128x128/9CA3AF/FFFFFF?text=User';
            }}
          />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Jane Doe</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Software Engineer</p>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300 px-2 leading-relaxed">
          Passionate about building beautiful and functional web applications. Always learning and exploring new technologies.
        </p>
        <div className="flex justify-center items-center space-x-4 mt-6">
          <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <Github size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
            <Twitter size={24} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-200">
            <Linkedin size={24} />
          </a>
          <a href="#" aria-label="Email" className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
            <Mail size={24} />
          </a>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; 2024 Jane Doe. All rights reserved.</p>
      </div>
    </div>
  );
}
