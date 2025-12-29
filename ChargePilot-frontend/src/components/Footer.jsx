// components/Footer.jsx
import React from "react";
import { Zap } from "lucide-react";

const FooterSection = ({ title, links }) => {
  return (
    <div>
      <h4 className="font-bold mb-5 text-lg">{title}</h4>
      <ul className="space-y-3 text-gray-400">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="hover:text-white transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
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
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ChargePilot</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Smart EV charging solutions for the modern driver.
            </p>
          </div>

          {sections.map((section, index) => (
            <FooterSection key={index} {...section} />
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ChargePilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
