import { useState, useRef } from "react";
import styled from "styled-components";
import one from "../assets/one.png";
import pause from "../assets/pause.png";
import play from "../assets/play.png";

export default function SpeedTest() {
  const [speed, setSpeed] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);
  const [more, setMore] = useState(false);

  const handleSpeedTest = async () => {
    setLoading(true);
    controller.current = new AbortController();

    try {
      const response = await fetch("http://localhost:5000/api/speedtest", {
        signal: controller.current.signal,
      });
      const data = await response.json();
      setSpeed(data.speed);
    } catch (error) {
      if ((error as Error).name === "AbortError") {
        console.log("Speed test aborted");
      } else {
        console.error("Error fetching speed data:", (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePause = () => {
    if (controller.current) {
      controller.current.abort();
    }
    setLoading(false);
  };


  return (
    <TestContainer>
      {!loading && speed > 0 && (
        <div className="logo-container">
          <img src={one} className="logo-img" alt="logo" />
          <h1 className="header">Fasty</h1>
        </div>
      )}
      {loading && <div className="spinner"></div>}
      <p className="data">
        {speed.toFixed()} <span>Mbps</span>
      </p>
      {loading ? (
        <button className="btn" onClick={handlePause}>
          <img src={pause} className="play-btn" alt="pause btn" />
        </button>
      ) : (
        <button className="btn" onClick={handleSpeedTest}>
          <img src={play} className="play-btn" alt="retry btn" />
        </button>
      )}
      <button onClick={() => setMore(true)}>more</button>
      {more && !loading && speed > 0 && <p>Download speed: {speed.toFixed(2)} Mbps</p>}
    </TestContainer>
  );
}

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo-container{
    display: flex;
    flex-direction: column;
    align-items: center:
    justify-content: center;
  }
  .logo-img {
    width:150px;
    height: 150px;
  }
  .header {
    margin: 0;  
    font-size: 4rem;
    padding: 0 0 40px 0;
  }
  .data {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
  }
  .btn {
    margin-top: 0.6rem;
    font-size: 2.1rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: white;
    padding: 20px 20px;

    &:hover {
      background-color:rgb(209, 215, 210);
    }

    &:disabled {
      background-color: #ccc;
    }
  }
  /* Spinner styles */
  .spinner {
    width: 50px; /* Diameter of the spinner */
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1); /* Light border */
    border-top: 5px solid #3498db; /* Blue border */
    border-radius: 50%; /* Makes it a circle */
    animation: spin 1s linear infinite; /* Spins continuously */
  }

  /* Animation keyframes */
  @keyframes spin {
    from {
      transform: rotate(0deg); /* Start position */
    }
    to {
      transform: rotate(360deg); /* End position */
    }
  }
    .pause-btn{
      width: 40px;
      height: 40px;
    }
    .play-btn{
      width: 50px;
      height: 50px;
    }  
    
`;
