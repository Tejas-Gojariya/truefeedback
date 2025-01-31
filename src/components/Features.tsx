import React from 'react';
import { Shield, Zap, Lock, Globe2, Users, Heart } from 'lucide-react';
import features from "../data/features-data.json"

const iconMap = { Shield, Zap, Lock, Globe2, Users, Heart };

export function Features() {
  return (
    <div id="features" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-400">Powerful features that make feedback meaningful and actionable</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];

            return (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-indigo-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-indigo-500" />
                  </div>
                  {feature.liveSoon && (
                    <span className="bg-slate-300 text-black text-xs/3 px-2 py-1.5 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
