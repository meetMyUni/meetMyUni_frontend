
import React from "react";
import "./CollegeSection.css";

const colleges = [
  {
    name: "Boston College",
    image: "/college-logos/boston.jpg",
    logo: "/college-logos/boston logo.jpg",
    rating: "4.6",
    year: "1863",
    fees: "₹63.7L – ₹2.84Cr",
    currency: "USD 69K – 3.1L",
    courses: 12,
    description: "Boston College is one of India's premier institutions offering quality education."
  },
  {
    name: "California Institute of Technology",
    image: "/college-logos/california.jpg",
    logo: "/college-logos/California logo.webp",
    rating: "4.7",
    year: "1891",
    fees: "₹79.1L – ₹2.53Cr",
    currency: "USD 86K – 2.7L",
    courses: 5,
    description: "California Institute of Technology is one of India's premier institutions offering quality education."
  },
  {
    name: "Harvard University",
    image: "/college-logos/harved.jpg",
    logo: "/college-logos/harved1logo.jpg",
    rating: "4.6",
    year: "1636",
    fees: "₹53.5L – ₹3.33Cr",
    currency: "USD 58K – 3.6L",
    courses: 26,
    description: "Harvard University is one of India's premier institutions offering quality education."
  },
  {
    name: "Aston Business School",
    image: "/college-logos/aston.jpg",
    logo: "/college-logos/aston logo.jpg",
    rating: "4.8",
    year: "1947",
    fees: "₹26.1L – ₹1.18Cr",
    currency: "GBP 21K – 94K",
    courses: 4,
    description: "Aston Business School is one of India's premier institutions offering quality education."
  },
  {
    name: "Harper Adams University",
    image: "/college-logos/harper.jpg",
    logo: "/college-logos/harper logo.png",
    rating: "4.1",
    year: "1901",
    fees: "₹25.3L – ₹84.4L",
    currency: "GBP 20K – 66K",
    courses: 5,
    description: "Harper Adams University is one of India's premier institutions offering quality education."
  },
  {
    name: "Imperial College",
    image: "/college-logos/imperial.jpg",
    logo: "/college-logos/imperial logo.png",
    rating: "4.5",
    year: "1907",
    fees: "₹42.6L – ₹2.24Cr",
    currency: "GBP 35K – 1.8L",
    courses: 7,
    description: "Imperial College is one of India's premier institutions offering quality education."
  },
  {
    name: "Cambrian College",
    image: "/college-logos/cambrian.jpg",
    logo: "/college-logos/cambrian logo.png",
    rating: "3.9",
    year: "1967",
    fees: "₹10.3L – ₹78.9L",
    currency: "CAD 15K – 1.2L",
    courses: 5,
    description: "Cambrian College is one of India's premier institutions offering quality education."
  },
  {
    name: "University of Regina",
    image: "/college-logos/regina.jpg",
    logo: "/college-logos/regina logo.png",
    rating: "4.2",
    year: "1911",
    fees: "₹5.2L – ₹1.41Cr",
    currency: "CAD 8K – 2.1L",
    courses: 24,
    description: "University of Regina is one of India's premier institutions offering quality education."
  },
  {
    name: "University of Saskatchewan",
    image: "/college-logos/sask.jpeg",
    logo: "/college-logos/saks logo.png",
    rating: "4.4",
    year: "1907",
    fees: "₹1.8L – ₹1.82Cr",
    currency: "CAD 3K – 2.7L",
    courses: 23,
    description: "University of Saskatchewan is one of India's premier institutions offering quality education."
  },
  {
    name: "Australian National University",
    image: "/college-logos/australian.jpeg",
    logo: "/college-logos/australian logo.png",
    rating: "4.4",
    year: "1946",
    fees: "₹20.3L – ₹1.44Cr",
    currency: "AUD 31K – 2.2L",
    courses: 25,
    description: "Australian National University is one of India's premier institutions offering quality education."
  },
  {
    name: "RMIT University",
    image: "/college-logos/rmit.jpg",
    logo: "/college-logos/rmit logo.jpg",
    rating: "3.9",
    year: "1887",
    fees: "₹28.3L – ₹1.33Cr",
    currency: "AUD 43K – 2L",
    courses: 22,
    description: "RMIT University is one of India's premier institutions offering quality education."
  },
  {
    name: "The University of Queensland",
    image: "/college-logos/queensland.jpg",
    logo: "/college-logos/queensland1logo.png",
    rating: "4.5",
    year: "1909",
    fees: "₹16.7L – ₹2.72Cr",
    currency: "AUD 26K – 4.2L",
    courses: 25,
    description: "The University of Queensland is one of India's premier institutions offering quality education."
  }
];

function CollegeSection({ onViewDetails }) {
  return (
    <section className="featured-colleges" id="featured-colleges">

      <div className="college-section-heading">
        <span>EXPLORE GLOBAL EDUCATION</span>
        <h2>Discover Your Dream University</h2>
        <p>
          Explore leading universities across the world and take
          the next step towards your study abroad journey.
        </p>
      </div>

      <div className="college-grid">
        {colleges.map((college, index) => (
          <article className="college-card" key={college.name}>

            <div className="college-image-wrapper">
              <img
                className="college-campus-image"
                src={college.image}
                alt={college.name}
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />

              <div className="college-image-overlay"></div>

              <div className="college-logo-box">
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <span className="college-popular">🔥 Popular</span>
            </div>

            <div className="college-card-content">

              <h3>{college.name}</h3>

              <div className="college-meta">
                <span className="college-rating">
                  ⭐ {college.rating}
                </span>
                <span className="college-year">
                  Est. {college.year}
                </span>
              </div>

              <p className="college-description">
                {college.description}
              </p>

              <div className="college-fees">
                <div>
                  <span className="college-label">TOTAL FEES</span>
                  <h4>{college.fees}</h4>
                  <p>{college.currency}</p>
                </div>

                <div className="college-course-count">
                  <span>Total Courses</span>
                  <strong>{college.courses}</strong>
                </div>
              </div>

              <button
                className="college-details-btn"
                onClick={() => onViewDetails(college)}
              >
                View Details <span>→</span>
              </button>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CollegeSection;
