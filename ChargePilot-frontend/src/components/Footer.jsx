// components/Footer.jsx
import React from "react";
import { Zap } from "lucide-react";

const FooterSection = ({ title, links, darkMode }) => {
  return (
    <div>
      <h4 className={`font-bold mb-5 text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</h4>
      <ul className={`space-y-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className={`${darkMode ? "hover:text-white" : "hover:text-gray-900"} transition-colors`}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = ({ darkMode }) => {
  const sections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "API"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Contact"],
    },
  ];

  return (
    <footer className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"} text-gray-900 dark:text-white py-16 border-t transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>ChargePilot</span>
            </div>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
              Smart EV charging solutions for the modern driver.
            </p>
          </div>

          {sections.map((section, index) => (
            <FooterSection key={index} {...section} darkMode={darkMode} />
          ))}
        </div>

        <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} pt-8 text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          <p>&copy; 2024 ChargePilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
