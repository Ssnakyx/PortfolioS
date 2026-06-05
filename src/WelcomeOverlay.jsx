import { useState, useEffect } from 'react';

export default function WelcomeOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => setVisible(false), 350);
  };

  useEffect(() => {
    const timer = setTimeout(dismiss, 4000);
    window.addEventListener('click',   dismiss, { once: true });
    window.addEventListener('keydown', dismiss, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click',   dismiss);
      window.removeEventListener('keydown', dismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .wo-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9500;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.68);
          animation: wo-in 0.45s ease forwards;
          pointer-events: all;
        }
        .wo-backdrop.fading { animation: wo-out 0.35s ease forwards; }

        @keyframes wo-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wo-out { from { opacity: 1; } to { opacity: 0; } }

        .wo-box {
          position: relative;
          padding: 30px 44px 26px;
          background: #070b22;
          clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px));
          box-shadow:
            inset 0 0 0 1px rgba(60, 226, 255, 0.22),
            0 0 48px rgba(196, 0, 26, 0.18);
          text-align: center;
          max-width: 440px;
          width: 90vw;
        }
        .wo-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #c4001a 0%, #3ce2ff 50%, #c4001a 100%);
        }

        .wo-title {
          font-family: 'Anton', sans-serif;
          font-size: 26px;
          letter-spacing: 5px;
          color: #3ce2ff;
          margin-bottom: 22px;
        }

        .wo-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 14px;
        }
        .wo-section + .wo-section {
          border-top: 1px solid rgba(60, 226, 255, 0.14);
          padding-top: 14px;
          margin-top: 4px;
        }

        .wo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 15px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.7);
        }

        .wo-key {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 34px;
          height: 26px;
          padding: 0 7px;
          border: 1px solid rgba(60, 226, 255, 0.35);
          border-radius: 3px;
          font-size: 12px;
          color: #3ce2ff;
          flex-shrink: 0;
          background: rgba(60, 226, 255, 0.06);
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1px;
        }

        .wo-dismiss {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.28);
          margin-top: 18px;
          animation: wo-pulse 1.8s ease-in-out infinite;
        }
        @keyframes wo-pulse {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.6; }
        }

        @media (max-width: 600px) {
          .wo-box    { padding: 22px 24px 20px; }
          .wo-title  { font-size: 20px; }
          .wo-row    { font-size: 13px; }
        }
      `}</style>

      <div className={`wo-backdrop${fading ? ' fading' : ''}`} onClick={dismiss} role="button">
        <div className="wo-box">
          <div className="wo-title">NAVIGATION</div>

          <div className="wo-section">
            <div className="wo-row">
              <span className="wo-key">↑</span>
              <span className="wo-key">↓</span>
              <span>NAVIGATE</span>
            </div>
            <div className="wo-row">
              <span className="wo-key">↵</span>
              <span>CONFIRM / OPEN</span>
            </div>
            <div className="wo-row">
              <span className="wo-key">ESC</span>
              <span>GO BACK</span>
            </div>
          </div>

          <div className="wo-section">
            <div className="wo-row">
              <span className="wo-key">HOVER</span>
              <span>SELECT</span>
            </div>
            <div className="wo-row">
              <span className="wo-key">CLICK</span>
              <span>CONFIRM</span>
            </div>
            <div className="wo-row">
              <span className="wo-key">2× CLICK</span>
              <span>CLOSE PANEL</span>
            </div>
          </div>

          <div className="wo-dismiss">CLICK OR PRESS ANY KEY TO DISMISS</div>
        </div>
      </div>
    </>
  );
}
