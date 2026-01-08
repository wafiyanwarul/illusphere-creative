import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

export const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Client Success Stories</h2>
          <p className="section-subtitle">
            Trusted by leading companies across tech and creative industries
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-quote-icon">
                <Quote size={32} />
              </div>
              
              <p className="testimonial-content">
                {testimonial.content}
              </p>
              
              <div className="testimonial-project">
                Project: {testimonial.project}
              </div>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                  <div className="author-company">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};