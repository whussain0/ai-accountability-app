// pages/index.js
import React, { useState, useEffect } from 'react';
import { CheckCircle, Target, Brain, Star, Loader } from 'lucide-react';
import Head from 'next/head';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Submit to Google Form with parameters in URL
      await fetch(
        `https://docs.google.com/forms/d/e/1FAIpQLScRPUOHLEOOpZnB1ZN3lT-SSJAIlhLr0M5Ovmi3y9PNTTpH_g/formResponse?entry.1608405667=${encodeURIComponent(email)}`,
        {
          method: 'POST',
          mode: 'no-cors',
        }
      );

      console.log('Form submitted with email:', email);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Accountability Partner</title>
        <meta name="description" content="Stay on track with your goals using personalized AI coaching" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Meet Your AI Accountability Partner
            </h1>
            <p className="text-lg sm:text-xl text-gray-900 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Stay on track with your goals using personalized AI coaching that adapts to your needs, 
              provides meaningful accountability, and helps you achieve what matters most.
            </p>
            
            <div className="max-w-md mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                    >
                      {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        'Join Waitlist'
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>
                  )}
                </form>
              ) : (
                <div className="bg-green-50 text-green-600 font-medium text-lg py-3 px-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 inline-block mr-2 mb-1" />
                  Thanks! We'll notify you when we launch.
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-16 px-4 sm:px-0">
            {[
              {
                icon: Brain,
                title: "AI-Powered Insights",
                description: "Smart goal tracking that learns your patterns and provides personalized strategies for success."
              },
              {
                icon: Target,
                title: "Adaptive Check-ins",
                description: "Natural conversations that adjust to your schedule and motivation levels."
              },
              {
                icon: CheckCircle,
                title: "Progress Tracking",
                description: "Visual insights and milestone celebrations to keep you motivated."
              },
              {
                icon: Star,
                title: "Personalized Experience",
                description: "Your AI partner adapts its approach based on what works best for you."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 mr-3 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-900 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}