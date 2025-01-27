import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <div className="py-24 bg-gradient-to-t from-gray-900 to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-12 rounded-3xl border border-indigo-500/30">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your team's feedback culture?</h2>
            <p className="text-gray-300 mb-8">Join thousands of teams already using our platform to build better communication.</p>
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 mx-auto">
              Start Your Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}