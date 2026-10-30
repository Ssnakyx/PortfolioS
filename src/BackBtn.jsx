import { useNavigate } from 'react-router-dom';

export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .back-btn-desktop {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 30;
          font-family: 'Anton', sans-serif;
          font-size: 16px;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.55);
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 9px 20px 9px 14px;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          cursor: pointer;
          pointer-events: all;
          transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        }
        .back-btn-desktop:hover {
          color: #fff;
          background: rgba(196, 0, 26, 0.55);
          border-color: rgba(196, 0, 26, 0.5);
        }
        @media (max-width: 768px) {
          .back-btn-desktop { display: none; }
        }
      `}</style>
      <button
        className="back-btn-desktop"
        type="button"
        onClick={() => navigate('/')}
      >
        ◄ BACK
      </button>
    </>
  );
}
