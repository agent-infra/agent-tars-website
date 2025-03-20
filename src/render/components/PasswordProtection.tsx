import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Icon from "./icon.png";

interface PasswordProtectionProps {
  correctPassword: string;
  onSuccess: () => void;
}

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ 
  correctPassword, 
  onSuccess 
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Check if already authenticated from localStorage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      onSuccess();
    }
  }, [onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      // Store authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      onSuccess();
    } else {
      setError(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setError(false), 1000);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0l-.83.828L5.96 2.243 8.2 0H5.374zM22.343 0l1.415 1.415-3.657 3.657 1.415 1.414L40.8 0H32zM0 0c2.336 4.582 5.07 7.314 8.2 8.2L0 16.4V0zm0 3.414L1.414 2 5.07 5.657 3.657 7.07 0 3.414zM0 17.657l6.485-6.485 1.415 1.415-7.9 7.9v-2.83zm0 5.657l12.142-12.142 1.415 1.415L0 26.272v-2.958zm0 5.657l17.8-17.8 1.415 1.415L0 31.93v-2.96zm0 5.657l23.457-23.457 1.415 1.415L0 37.587v-2.96zm0 5.657L29.114 0h2.83L0 43.244v-2.96zm0 5.657L34.77 0h2.83L0 48.9v-2.96zm0 5.657L40.428 0h2.83L0 54.556v-2.96zm0 5.657L46.085 0h2.83L0 60v-2.96z' fill='rgba(255,255,255,0.02)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-black/50 backdrop-blur-md border border-white/10 p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-6"
          >
            <img
              src={Icon}
              alt="Agent TARS Logo"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Password Protected</h2>
            <p className="text-gray-400">Please enter the password to continue</p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <motion.div
              animate={{ x: error ? [-10, 10, -10, 10, 0] : 0 }}
              transition={{ duration: 0.4 }}
            >
              <Input
                type={isVisible ? "text" : "password"}
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
                color={error ? "danger" : "default"}
                autoFocus
                className="mb-4"
                classNames={{


                  input: "text-lg tracking-wider text-white",
                  inputWrapper: "border-1 border-white/30 hover:border-white/50 focus-within:border-white/70 bg-black/30",
                  label: "text-white/70"
                }}
                endContent={
                  <button
                    className="focus:outline-none text-white/70 hover:text-white"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-lg pointer-events-none" />
                    ) : (
                      <FaEye className="text-lg pointer-events-none" />
                    )}
                  </button>
                }
              />
            </motion.div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white font-medium text-lg py-6"
            >
              Enter
            </Button>
            
            {attempts > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-red-400"
              >
                Incorrect password. Please try again.
              </motion.p>
            )}
          </form>
        </Card>
      </motion.div>
    </div>
  );
};