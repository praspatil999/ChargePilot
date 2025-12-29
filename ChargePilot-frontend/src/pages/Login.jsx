import React, { useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  // Prevent default form submission if this is called from an <onSubmit>
  if (e) e.preventDefault();

  setIsLoading(true);

  try {

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      // 2. SUCCESS: Passport handles sessions automatically via Cookies.
      // We check for the user object your backend sends.
      console.log("Logged in user:", data.user);

      // 3. Navigate to the internal route path only
      navigate("/");
    } else {
      // 4. ERROR: Display message from Passport (e.g., "Incorrect password")
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Could not connect to the server.");
  } finally {
    setIsLoading(false);
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              ChargePilot
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-light">
            Sign in to continue your EV charging journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-gray-300 text-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                // TODO: Backend OAuth integration
                // window.location.href = 'http://localhost:5000/api/auth/google';
                alert("Google OAuth will be connected to backend");
              }}
              className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 font-medium text-gray-700 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                // TODO: Backend OAuth integration
                // window.location.href = 'http://localhost:5000/api/auth/github';
                alert("GitHub OAuth will be connected to backend");
              }}
              className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 font-medium text-gray-700 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <a
            href="Signup"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}
