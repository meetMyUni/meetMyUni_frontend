
import { useEffect, useRef, useState } from "react";

const universities = [
  ["Amity University Online", "/college-logos/amity.jpg", "UGC, AICTE"],
  ["Op Jindal University", "/college-logos/op jindal.jpg", "UGC"],
  ["Galgotias University", "/college-logos/galgotias.jpg", "UGC, NAAC A+"],
  ["Parul University", "/college-logos/parul.jpg", "UGC, NAAC A++"],
  ["VGU University", "/college-logos/VGU.jpg", "UGC"],
  ["Golden Gate University", "/college-logos/goldengate.jpg", "WES Recognized"],
  ["Uttaranchal University", "/college-logos/uttaranchal.jpg", "UGC, NAAC A+"],
  ["MMU University", "/college-logos/mmu.jpg", "UGC, NAAC A+"],
  ["GLA University", "/college-logos/GLA1.jpg", "UGC, NAAC A+"],
  ["Jain University", "/college-logos/jain.png", "UGC, NAAC A++"],
  ["Manipal University Jaipur", "/college-logos/manipal.jpg", "UGC, NAAC A++"],
  ["Shoolini University", "/college-logos/shoolini.png", "UGC, NAAC A+"],
  ["Sharda University", "/college-logos/sharda.png", "UGC, NAAC A+"],
  ["Chandigarh University", "/college-logos/chandigarh.png", "UGC, NAAC A+"],
  ["DY Patil University", "/college-logos/DYPatil.jpg", "UGC, NAAC A++"],
  ["Lovely Professional University", "/college-logos/lovely1.jpg", "UGC, NAAC A++"],
];

// University comparison data visible in your screenshots
const universityDetails = [
  {
    name: "Manipal University Jaipur (MUJ Online)",
    rank: "Rank #64 Overall",
    accreditation: "NAAC A+ (3.28 CGPA) • UGC-DEB • AICTE • WES",
    fee: "₹1,75,000",
    semesterFee: "₹43,750 / sem",
    emi: "₹4,999 / mo",
    placement: "₹7.5 – ₹11 LPA",
    exam: "100% Online Proctored",
  },
  {
    name: "Amity University Online",
    rank: "Top 35 Universities",
    accreditation: "NAAC A+ • UGC-DEB • QS World Ranked (Top 3% Globally) • WES",
    fee: "₹1,99,000",
    semesterFee: "₹49,750 / sem",
    emi: "₹5,500 / mo",
    placement: "₹8.0 – ₹12 LPA",
    exam: "100% Online Proctored",
  },
  {
    name: "D.Y. Patil Vidyapeeth Online (DPU-COL)",
    rank: "Rank #46 (University)",
    accreditation: "NAAC A++ (3.62 CGPA) • UGC-DEB • AICTE • Category-1 Autonomy",
    fee: "₹1,40,000",
    semesterFee: "₹35,000 / sem",
    emi: "₹4,200 / mo",
    placement: "₹7.0 – ₹10.5 LPA",
    exam: "100% Online Proctored",
  },
  {
    name: "Chandigarh University Online (CU Online)",
    rank: "Rank #32 (University)",
    accreditation: "NAAC A+ (3.28 CGPA) • UGC-DEB • AICTE • QS Asia Ranked",
    fee: "₹1,50,000",
    semesterFee: "₹37,500 / sem",
    emi: "₹3,999 / mo",
    placement: "₹6.8 – ₹9.5 LPA",
    exam: "100% Online Proctored",
  },
  {
    name: "Jain University Online (JAIN Deemed-to-be)",
    rank: "Rank #68 (University)",
    accreditation: "NAAC A++ (3.71 CGPA) • UGC-DEB • AICTE • KSURF 5-Star",
    fee: "₹1,60,000 – ₹2,10,000",
    semesterFee: "₹40,000 / sem",
    emi: "₹4,750 / mo",
    placement: "₹7.5 – ₹11.5 LPA",
    exam: "100% Online Proctored",
  },
  {
    name: "NMIMS Centre for Distance & Online Education",
    rank: "Top 25 Management",
    accreditation: "NAAC A+ (3.59 CGPA) • UGC-DEB • Category-1 Autonomy • MHRD",
    fee: "₹1,68,000 – ₹1,96,000",
    semesterFee: "₹42,000 / sem",
    emi: "₹5,200 / mo",
    placement: "₹8.5 – ₹13 LPA",
    exam: "Online Proctored / Center-based",
  },
];

function Universities({
  onViewAll,
  showAllUniversities = false,
  onViewDetails,
}) {
  const sliderRef = useRef(null);
  const loopWidth = useRef(0);

  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  // Start in the middle copy
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || showAllUniversities) return;

    const setupSlider = () => {
      loopWidth.current = slider.scrollWidth / 3;
      slider.scrollLeft = loopWidth.current;
    };

    setupSlider();
    window.addEventListener("resize", setupSlider);

    return () => {
      window.removeEventListener("resize", setupSlider);
    };
  }, [showAllUniversities]);

  // Automatic continuous movement
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || showAllUniversities) return;

    const interval = setInterval(() => {
      if (!drag.current.active && !isDragging) {
        slider.scrollLeft += 1;
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isDragging, showAllUniversities]);

  // Infinite slider
  function handleScroll() {
    const slider = sliderRef.current;
    const width = loopWidth.current;

    if (!slider || !width) return;

    if (slider.scrollLeft >= width * 2) {
      slider.scrollLeft -= width;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft += width;
    }
  }

  // Mouse and touch dragging
  function handlePointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: sliderRef.current.scrollLeft,
    };

    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!drag.current.active) return;

    const distance = e.clientX - drag.current.startX;

    sliderRef.current.scrollLeft =
      drag.current.startScroll - distance;
  }

  function handlePointerUp(e) {
    drag.current.active = false;
    setIsDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <section id="top-universities" className="universities-section">

      {showAllUniversities ? (

        // COMPLETE UNIVERSITY COMPARISON TABLE
        <div className="all-universities-container">

          <div className="all-universities-heading">
            <div>
              <h2>
                Top UGC-DEB Approved Online MBA Colleges in India (2026)
              </h2>
            </div>

            <p>
              Verified accreditation status, total course fees, and
              median compensation packages across premier institutions.
            </p>
          </div>

          <div className="university-table-wrapper">
            <table className="university-comparison-table">

              <thead>
                <tr>
                  <th>University / Institution</th>
                  <th>Accreditation & Approvals</th>
                  <th>Total Tuition Fee</th>
                  <th>EMI Option</th>
                  <th>Median Placement</th>
                  <th>Exam Mode</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {universityDetails.map((university, index) => (
                  <tr key={index}>

                    <td className="comparison-university-name">
                      <strong>{university.name}</strong>
                      <span>{university.rank}</span>
                    </td>

                    <td>
                      <div className="accreditation-box">
                        {university.accreditation}
                      </div>
                    </td>

                    <td className="comparison-fee">
                      <strong>{university.fee}</strong>
                      <span>{university.semesterFee}</span>
                    </td>

                    <td className="comparison-emi">
                      {university.emi}
                    </td>

                    <td className="comparison-placement">
                      {university.placement}
                    </td>

                    <td className="comparison-exam">
                      {university.exam}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-details-btn"
                        onClick={onViewDetails}
                      >
                        View Details ↗
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      ) : (

        // EXISTING UNIVERSITY SLIDER
        <>
          <div className="universities-heading">
            <h2>Online MBA from Top Universities</h2>
            <p>
              Explore Online MBA programs from leading universities.
            </p>
          </div>

          <div
            className={`university-slider ${isDragging ? "dragging" : ""}`}
            ref={sliderRef}
            onScroll={handleScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="university-track">
              {[...universities, ...universities, ...universities].map(
                ([name, image, accreditation], index) => (
                  <div className="university-card" key={index}>
                    <div className="university-logo">
                      <img
                        src={image}
                        alt={name}
                        draggable="false"
                      />
                    </div>

                    <h3>{name}</h3>
                    <p>{accreditation}</p>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="view-universities">
            <button type="button" onClick={onViewAll}>
              View All Universities
            </button>
          </div>
        </>

      )}

    </section>
  );
}

export default Universities;
