import React from 'react';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "HR Director",
        company: "Tech Corp",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
        quote: "This platform transformed our feedback culture. Teams are more open and honest than ever."
    },
    {
        name: "Michael Chen",
        role: "Engineering Lead",
        company: "StartupX",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
        quote: "The anonymous feedback feature helped us identify and solve critical issues quickly."
    },
    {
        name: "Emma Davis",
        role: "Team Manager",
        company: "Global Inc",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
        quote: "Simple to use yet powerful. It's now an essential part of our team communication."
    }
];

export function Testimonials() {
    return (
        <div id="testimonials" className="py-24 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Loved by Teams Worldwide</h2>
                    <p className="text-gray-400">See what our users have to say about their experience</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                    <p className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                                </div>
                            </div>
                            <p className="text-gray-300">{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}