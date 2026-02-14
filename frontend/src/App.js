import { useState, useEffect, useRef } from "react";
import "@/App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Fade in sections on load
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('visible');
      }, index * 200);
    });
  }, []);

  const handleSurpriseClick = () => {
    setShowPopup(true);
  };

  const handleResponse = (response) => {
    setSelectedResponse(response);
    setShowResponse(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowResponse(false);
    setSelectedResponse("");
  };

  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (musicPlaying) {
          audioRef.current.pause();
          setMusicPlaying(false);
        } else {
          await audioRef.current.play();
          setMusicPlaying(true);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  return (
    <div className="valentine-container">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}>❤</div>
        ))}
      </div>

      {/* Music Toggle Button */}
      <button 
        onClick={toggleMusic} 
        className="music-toggle"
        data-testid="music-toggle-btn"
      >
        {musicPlaying ? '🎵' : '🔇'}
      </button>

      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4a496379cf.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section */}
      <section className="hero-section fade-in-section" data-testid="hero-section">
        <h1 className="main-heading" data-testid="main-heading">
          Happy Valentine's Day, Sree ❤️
        </h1>
        <p className="subtext" data-testid="hero-subtext">
          Forever feels right when it's with you.
        </p>
        <p className="playful-text" data-testid="playful-text">
          — Your future husband (lucky fellow), Kartik 😌
        </p>
      </section>

      {/* Photo Section */}
      <section className="photo-section fade-in-section" data-testid="photo-section">
        <div className="photo-frame">
          <img 
            src="https://customer-assets.emergentagent.com/job_love-sree/artifacts/hdiwot3y_WhatsApp%20Image%202026-02-14%20at%201.21.20%20PM.jpeg" 
            alt="Kartik and Sreemathy"
            className="couple-photo"
            data-testid="couple-photo"
          />
        </div>
      </section>

      {/* Playful Love Note Section */}
      <section className="love-note-section fade-in-section" data-testid="love-note-section">
        <div className="content-card">
          <h2 className="section-heading" data-testid="love-note-heading">
            Little Confession 💌
          </h2>
          <p className="section-text" data-testid="love-note-text">
            You are my peace in chaos, my comfort in stress, and my happiest thought at the end of every day.
          </p>
        </div>
      </section>

      {/* Emotional Section */}
      <section className="promise-section fade-in-section" data-testid="promise-section">
        <div className="content-card">
          <h2 className="section-heading" data-testid="promise-heading">
            One Promise 💍
          </h2>
          <p className="section-text" data-testid="promise-text">
            No matter how life changes, how busy days get, or how tough moments feel — I promise to choose you. Not just today. Not just on Valentine's Day. But every single day. In every version of life. With all of me.
          </p>
        </div>
      </section>

      {/* Surprise Button */}
      <section className="surprise-section fade-in-section" data-testid="surprise-section">
        <button 
          className="surprise-btn"
          onClick={handleSurpriseClick}
          data-testid="surprise-btn"
        >
          Tap Here ❤️
        </button>
      </section>

      {/* Footer */}
      <footer className="footer" data-testid="footer">
        <p>Made with all my love ❤️ — Kartik</p>
      </footer>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup} data-testid="popup-overlay">
          <div className="popup-content" onClick={(e) => e.stopPropagation()} data-testid="popup-content">
            <div className="popup-hearts-subtle">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="popup-heart-subtle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}>❤</div>
              ))}
            </div>
            
            {!showResponse ? (
              <>
                <p className="popup-message" data-testid="popup-message">
                  Will you choose me… every single day? ❤️
                </p>
                <div className="popup-buttons">
                  <button 
                    className="response-btn always-btn"
                    onClick={() => handleResponse('Always ❤️')}
                    data-testid="always-btn"
                  >
                    Always ❤️
                  </button>
                  <button 
                    className="response-btn forever-btn"
                    onClick={() => handleResponse('Forever 💍')}
                    data-testid="forever-btn"
                  >
                    Forever 💍
                  </button>
                </div>
              </>
            ) : (
              <div className="response-message" data-testid="response-message">
                <p className="response-final-text">
                  {selectedResponse === 'Always ❤️' 
                    ? 'I will too. Always. 🥺'
                    : 'Then let\'s write our forever together. ✨'
                  }
                </p>
                <button 
                  className="close-btn"
                  onClick={closePopup}
                  data-testid="close-popup-btn"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
