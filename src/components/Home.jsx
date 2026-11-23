
import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeReviews from "./HomeReviews";
import HomeFooter from "./HomeFooter";

const heroImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=2000&q=85"
];

const countries = [
  { name: "United States", image: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=700&q=80" },
  { name: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=700&q=80" },
  { name: "Canada", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=700&q=80" },
  { name: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80" },
  { name: "Germany", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80" },
  { name: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80" },
  { name: "New Zealand", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=700&q=80" },
  { name: "Italy", image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=700&q=80" },
  { name: "Ireland", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=700&q=80" },
  { name: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80" }
];

const cities = [
  { name: "Hyderabad", image: "https://images.unsplash.com/photo-1713113930278-b3970e95702d?auto=format&fit=crop&w=500&q=80" },
  { name: "Dehradun", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=500&q=80" },
  { name: "Noida", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80" },
  { name: "Greater Noida", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=500&q=80" },
  { name: "Jaipur", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=500&q=80" },
  { name: "Pune", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80" },
  { name: "Nagpur", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80" },
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=500&q=80" },
  { name: "Indore", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=500&q=80" },
  { name: "Bhopal", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80" },
  { name: "Gurgaon", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80" },
  { name: "Ahmedabad", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=500&q=80" },
  { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=500&q=80" },
  { name: "Lucknow", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=500&q=80" },
  { name: "Bengaluru", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=500&q=80" }
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [availableImages, setAvailableImages] = useState([]);

  useEffect(() => {
    let isActive = true;

    Promise.all(
      heroImages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(null);
          img.src = src;
        });
      })
    ).then((images) => {
      if (isActive) {
        setAvailableImages(images.filter(Boolean));
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (availableImages.length < 2) return;

    const interval = setInterval(() => {
      setCurrentImage((previous) =>
        (previous + 1) % availableImages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [availableImages]);

  return (
    <main className="home-page">

      {/* 1. Hero Section */}
      <section
        className="home-hero"
        style={{
          backgroundImage: availableImages.length
            ? `url("${availableImages[currentImage]}")`
            : "none",
          backgroundColor: "#26364f"
        }}
      >
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <p>YOUR FUTURE STARTS HERE</p>
            <h1>Explore the World.<br />Discover Your Future.</h1>
            <span>
              Find the right destination for your higher education journey.
            </span>
          </div>

          <div className="hero-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={currentImage === index ? "active" : ""}
                onClick={() => setCurrentImage(index)}
                aria-label={`Show background image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Study Abroad Countries */}
      <section className="home-countries">
        <div className="home-section-heading">
          <p>CHOOSE YOUR DESTINATION</p>
          <h2>Study Abroad</h2>
          <span>Explore popular countries for your international education.</span>
        </div>

        <div className="country-slider">
          {countries.map((country) => (
            <article className="country-card" key={country.name}>
              <img src={country.image} alt={country.name} />
              <div className="country-card-overlay">
                <h3>{country.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Study Abroad Information */}
      <section className="home-info-section study-info">
        <div className="home-info-content">
          <p className="home-info-label">GLOBAL EDUCATION OPPORTUNITIES</p>
          <h2>Turn Your Study Abroad Dreams Into Reality</h2>
          <p>
            Explore top international universities, courses, scholarships
            and admission opportunities with MeetMyUni. Get expert guidance
            to make informed decisions about your global education journey.
          </p>
          <Link to="/study-abroad" className="home-info-button">
            Explore Study Abroad
          </Link>
        </div>
      </section>

      {/* 4. Top Cities */}
      <section className="home-cities">
        <div className="home-section-heading">
          <p>EXPLORE STUDENT DESTINATIONS</p>
          <h2>Top Cities to Study</h2>
          <span>Discover some of the most popular cities.</span>
        </div>

        <div className="city-grid">
          {cities.map((city) => (
            <article className="city-card" key={city.name}>
              <img src={city.image} alt={city.name} />
              <h3>{city.name}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* 5. MBA in India Information */}
      <section className="home-info-section mba-info">
        <div className="home-info-content">
          <p className="home-info-label">BUILD YOUR MANAGEMENT CAREER</p>
          <h2>Find the Right MBA College to Shape Your Future</h2>
          <p>
            Explore leading MBA colleges across India, compare programs
            and understand admission requirements to choose the right
            college for your career goals.
          </p>
          <Link to="/online-mba" className="home-info-button">
            Explore MBA Colleges
          </Link>
        </div>
      </section>

      {/* 6. MBBS in India Information */}
      <section className="home-info-section mbbs-info">
        <div className="home-info-content">
          <p className="home-info-label">YOUR FUTURE IN MEDICINE</p>
          <h2>Begin Your Journey Towards a Career in Medicine</h2>
          <p>
            Explore medical colleges across India, understand MBBS
            eligibility and admission opportunities, and get guidance
            to make an informed choice.
          </p>
          <Link to="/mbbs" className="home-info-button">
            Explore Medical Colleges
          </Link>
        </div>
      </section>

     <HomeReviews />
<HomeFooter />

    </main>
  );
}

export default Home;
