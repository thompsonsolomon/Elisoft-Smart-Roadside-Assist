import React from 'react'
import { testimonials } from '../../../data'
import { Star } from 'lucide-react'

function Testemonials() {
  return (
     <section className="py-20" id='testimonials'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gold mb-4">What Our Customers Say</h2>
                <p className="text-xl text-gray-300">Join thousands of satisfied customers</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="card">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                    <div className="font-semibold text-gold">- {testimonial.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
  )
}

export default Testemonials