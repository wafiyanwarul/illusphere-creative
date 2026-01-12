import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    quote: "Illusphere Creative transformed our digital presence completely. Their team delivered a stunning website that increased our conversions by 150%.",
    name: 'Ridho Aulia',
    position: 'CEO',
    company: 'TechStart Indonesia',
    rating: 5,
    avatar: 'SJ'
  },
  {
    id: 2,
    quote: "The AI chatbot they built for us handles 80% of customer inquiries automatically. Professional, responsive, and highly skilled team.",
    name: 'Muhammad Faqih',
    position: 'Operations Director',
    company: 'RetailHub Asia',
    rating: 5,
    avatar: 'MC'
  },
  {
    id: 3,
    quote: "Outstanding creative work! Their social media campaign doubled our engagement rate in just 3 months. Highly recommended!",
    name: 'Priya Sharma',
    position: 'Fachrizal Fazza',
    company: 'GrowthLab',
    rating: 5,
    avatar: 'PS'
  }
];

export const TestimonialsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Success stories from businesses we've helped grow
          </p>
        </div>

        <div className="testimonials-grid-new">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card-new">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} size={20} fill="#C9A25F" color="#C9A25F" />
                ))}
              </div>
              
              <p className="testimonial-quote">
                "{testimonial.quote}"
              </p>
              
              <div className="testimonial-author-new">
                <div className="author-avatar">
                  {testimonial.avatar}
                </div>
                <div className="author-details">
                  <div className="author-name-new">{testimonial.name}</div>
                  <div className="author-position">{testimonial.position}</div>
                  <div className="author-company-new">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-cta">
          <button 
            className="btn-primary"
            onClick={() => navigate('/testimonials')}
          >
            View All Testimonials
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};