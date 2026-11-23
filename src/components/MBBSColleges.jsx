import "./MBBSColleges.css";
const colleges = [
  {
    name: "All India Institute of Medical Sciences",
    shortName: "AIIMS Delhi",
    city: "Delhi",
    type: "Public/Government",
    exams: "NEET +1 More",
    fees: "₹5.86 K",
    salary: "₹3.4 L - ₹3.4 Cr",
    courses: "132 Courses",
    image: "https://cache.careers360.mobi/media/article_images/2026/4/25/Aiims-delhi-building-featured-image.jpg"
  },
  {
    name: "Vardhman Mahavir Medical College",
    city: "Delhi",
    type: "Public/Government",
    exams: "NEET PG +1 More",
    fees: "₹2.62 L",
    courses: "43 Courses",
    image: "/college-logos/mahavir.jpg"
  },
  {
    name: "JIPMER - Jawaharlal Institute of Postgraduate Medical Education and Research",
    city: "Puducherry",
    type: "National",
    exams: "NEET",
    fees: "₹30.46 K",
    salary: "₹6.0 L - ₹24.0 L",
    courses: "125 Courses",
    image: "/college-logos/jipmer.webp"
  },
  {
    name: "AIIMS Jodhpur - All India Institute of Medical Sciences",
    city: "Jodhpur",
    type: "Public/Government",
    exams: "NEET +2 More",
    salary: "₹8.0 L - ₹16.3 L",
    courses: "78 Courses",
    image: "https://static.toiimg.com/thumb/msid-95438408%2Cwidth-1280%2Cheight-720%2Cresizemode-72/95438408.jpg"
  },
  {
    name: "University College of Medical Sciences, University of Delhi",
    city: "Delhi",
    type: "Public/Government",
    exams: "NEET PG +1 More",
    fees: "₹3.15 L",
    salary: "₹5.5 L - ₹17.0 L",
    courses: "27 Courses",
    image: "https://www.collegebatch.com/static/clg-gallery/university-college-of-medical-sciences-new-delhi-243181.webp"
  },
  {
    name: "AIIMS Bhopal - All India Institute of Medical Sciences",
    city: "Bhopal",
    type: "Public/Government",
    exams: "NEET PG +2 More",
    salary: "₹1.2 L - ₹21.0 L",
    courses: "74 Courses",
    image: "https://images.hindustantimes.com/rf/image_size_800x600/HT/p2/2016/09/18/Pictures/aiims-bhopal_9b36ca66-7d79-11e6-85ec-37294133f8ac.jpg"
  },
  {
    name: "All India Institute of Medical Sciences, Bhubaneswar",
    city: "Bhubaneswar",
    type: "Public/Government",
    exams: "NEET PG +3 More",
    salary: "₹13.0 L - ₹15.0 L",
    courses: "45 Courses",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/AIIMS_Bhubaneswar_01.jpg"
  },
  {
    name: "B. J. Medical College",
    city: "Ahmedabad",
    type: "Public/Government",
    exams: "NEET PG +1 More",
    fees: "₹1.13 L",
    salary: "₹1.0 L - ₹2.3 L",
    courses: "54 Courses",
    image: "https://feeds.abplive.com/onecms/images/uploaded-images/2022/12/28/989a924164fa9af27eabf997bfbf22431672219238336359_original.jpg"
  },
  {
  name: "AIIMS Raipur - All India Institute of Medical Sciences",
  city: "Raipur",
  type: "Public/Government",
  exams: "NEET +2 More",
  fees: "₹5.29 K",
  salary: "₹10.0 L - ₹15.0 L",
  courses: "65 Courses",
  image: "/college-logos/Aiims raipur.jpg"
  }
];


import React, { useState } from "react";

function MBBSCollegeCard({ college, onViewDetails }) {
  const [liked, setLiked] = useState(false);

  const logoText = college.shortName ||
    college.name.split(" ").slice(0, 2).map(word => word[0]).join("");

  return (
    <div
      className="mbbs-college-card"
      style={{
        backgroundImage: `url("${college.image}")`
      }}
    >
      {/* Dark gradient overlay */}
      <div className="mbbs-college-overlay"></div>

      <div className="mbbs-college-content">

        {/* Logo and Favourite */}
        <div className="mbbs-college-top">
          <div className="mbbs-college-logo">
            {logoText}
          </div>

          <button
            className={`mbbs-heart ${liked ? "liked" : ""}`}
            onClick={() => setLiked(!liked)}
            aria-label="Add to favourites"
          >
            {liked ? "♥" : "♡"}
          </button>
        </div>

        {/* College Details */}
        <div className="mbbs-college-info">

          <h3>{college.name}</h3>

          <p className="mbbs-college-location">
            📍 {college.city}
            <span>•</span>
            {college.type}
          </p>

          {/* Badges */}
          <div className="mbbs-college-badges">
            <span className="mbbs-exam-badge">
              🎓 {college.exams}
            </span>

            {college.rating && (
              <span className="mbbs-rating-badge">
                ⭐ {college.rating}
              </span>
            )}

            {college.established && (
              <span className="mbbs-established-badge">
                Est. {college.established}
              </span>
            )}
          </div>

          {/* Fees and Salary */}
          <div className="mbbs-college-details">

            {college.fees && (
              <div>
                <span>TOTAL FEES</span>
                <strong>{college.fees}</strong>
              </div>
            )}

            {college.salary && (
              <div>
                <span>MEDIAN SALARY</span>
                <strong>{college.salary}</strong>
              </div>
            )}

            <div className="mbbs-total-courses">
              <span>Total Courses</span>
              <strong>{college.courses}</strong>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mbbs-college-actions">
            <button
              onClick={() => onViewDetails && onViewDetails(college)}
            >
              ▣ View Details
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

function MBBSColleges({ onViewDetails }) {
  return (
    <section className="mbbs-colleges-section">

      <div className="mbbs-colleges-heading">
        <h2>Top Medical Colleges in India</h2>
        <p>
          Explore leading medical colleges and find the right
          institution for your MBBS journey.
        </p>
      </div>

      <div className="mbbs-colleges-grid">
        {colleges.map((college, index) => (
          <MBBSCollegeCard
            key={index}
            college={college}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

    </section>
  );
}

export default MBBSColleges;
