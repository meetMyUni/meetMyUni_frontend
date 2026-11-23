
import { useState, useEffect } from "react";
import "./HomeReviews.css";


const reviews = [
  {
    name: "Sample Student 1",
    course: "Study Abroad",
    text: "The guidance throughout my study abroad journey helped me understand university options, application requirements and the admission process. The support made the process easier to navigate."
  },
  {
    name: "Sample Student 2",
    course: "MBA in India",
    text: "Choosing the right MBA college can be confusing. The counselling helped me understand different colleges, their programs and admission requirements before making my decision."
  },
  {
    name: "Sample Student 3",
    course: "MBBS in India",
    text: "Understanding medical college options and admission requirements was an important part of my journey. The guidance helped me explore my options more clearly."
  },
  {
    name: "Sample Student 4",
    course: "Study Abroad",
    text: "From exploring destinations to understanding university applications, the guidance helped me organise the different steps involved in planning my international education."
  },
  {
    name: "Sample Student 5",
    course: "MBA in India",
    text: "The information about MBA colleges and admission processes helped me compare my options and make a more informed decision about my management education."
  },
  {
    name: "Sample Student 6",
    course: "MBBS in India",
    text: "The counselling helped me understand the MBBS admission process and explore medical colleges according to my preferences. It made my college search more organised."
  }
];


function HomeReviews() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);

  const previousReview = () => {
    setCurrent((current - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrent((current + 1) % reviews.length);
  };

  return (
    <section className="home-reviews">
      <div className="reviews-heading">
        <p>STUDENT EXPERIENCES</p>
        <h2>What Our Students Say</h2>
        <span>Hear about the experiences of students on their education journey.</span>
      </div>

      <div className="review-carousel">
        <button
          className="review-arrow"
          onClick={previousReview}
          aria-label="Previous review"
        >
          &#10094;
        </button>

        
<div className="review-stack">
  {reviews.map((item, index) => {
    const position =
      (index - current + reviews.length) % reviews.length;

    return (
      <article
        key={item.name}
        className={`review-card ${
          position === 0 ? "front-card" : "back-card"
        }`}
        style={{
          zIndex: reviews.length - position,
          transform: `translateX(${position * 12}px) scale(${1 - position * 0.015})`
        }}
      >
        {position === 0 && (
          <>
            <div className="review-stars">★★★★★</div>

            <p className="review-text">
              “{item.text}”
            </p>

            <div className="review-student">
              <div className="review-avatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3>{item.name}</h3>
                <span>{item.course}</span>
              </div>
            </div>
          </>
        )}
      </article>
    );
  })}
</div>


        <button
          className="review-arrow"
          onClick={nextReview}
          aria-label="Next review"
        >
          &#10095;
        </button>
      </div>

      <div className="review-dots">
        {reviews.map((review, index) => (
          <button
            key={review.name}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HomeReviews;
