import React from 'react';
import { Shield, Zap, Lock, Globe2, Users, Heart } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "100% Anonymous",
    description: "Your identity remains completely private. We never collect or store personal information."
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Messages are delivered instantly. No delays, no waiting. Real-time feedback when it matters."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption ensures your messages remain confidential and secure."
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Connect with team members across different time zones and languages."
  },
  {
    icon: Users,
    title: "Team Analytics",
    description: "Gain insights from feedback patterns and improve team dynamics."
  },
  {
    icon: Heart,
    title: "Custom Branding",
    description: "Make the platform yours with customizable themes and branding options."
  }
];

export function Features() {
  return (
    <div id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-400">Powerful features that make feedback meaningful and actionable</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}