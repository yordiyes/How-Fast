import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import one from "../assets/one.png";
import pause from "../assets/pause.png";
import play from "../assets/play.png";
import { BiLogoTelegram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
export default function SpeedTest() {
  const [speed, setSpeed] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);

  const handleSpeedTest = async () => {
    setLoading(true);
    controller.current = new AbortController();

    try {
      const response = await fetch("http://localhost:5000/api/speedtest", {
        signal: controller.current.signal,
      });
      const data = await response.json();

      const speedInKbps = data.speed * 1000;
      setSpeed(speedInKbps);
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

  const displaySpeed = () => {
    const isKbps = speed < 1000;

    return isKbps ? (
      speed === 0 ? (
        null
      ) : (
        <p className="data">
          {speed.toFixed()} <span>Kbps</span>
        </p>
      )
    ) : (
      <p className="data">
        {(speed / 1000).toFixed()} <span>Mbps</span>
      </p>
    );
  };

  useEffect(() => {
    handleSpeedTest();
  }, []);

  return (
    <TestContainer>
      <div className="logo-container">
        <img src={one} className="logo-img" alt="logo" />
        <h1 className="header">Fasty</h1>
      </div>
      {loading && <div className="spinner"></div>}
      {!loading && speed >0 &&<p>Your internet speed is </p>}
      {displaySpeed()}
      {!loading && speed > 0 && (
        <p className="dn-load-p">
          Download speed:{" "}
          <b className="dn-load">{(speed / 1000).toFixed(2)} Mbps</b>
        </p>
      )}
      {loading ? (
        <button className="btn" onClick={handlePause}>
          <img src={pause} className="pause-btn" alt="pause btn" />
        </button>
      ) : (
        <button className="btn btn-play" onClick={handleSpeedTest}>
          <img src={play} className="play-btn" alt="retry btn" />
        </button>
      )}

      {!loading && speed > 0 && (
        <div>
          <BiLogoTelegram className="icons" />
          <FaXTwitter className="icons" />
          <FaFacebook className="icons" />
        </div>
      )}
    </TestContainer>
  );
}

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh; 
  padding-top: 20px;
  .logo-container{
    display: flex;
    flex-direction: column;
    align-items: center:
    justify-content: center;
    margin-top: 0;
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
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: white;
    padding: 10px;

    &:hover {
      background-color:rgb(159, 170, 179);
      cursor: pointer;
    }

    &:disabled {
      background-color: #ccc;
    }
  }
    .btn-play{
      font-size: 2.5;
    }
      .dn-load{
        color: #1535ab;
      }
  /* Spinner styles */
  .spinner {
    width: 35px; 
    height: 35px;
    border: 5px solid rgba(0, 0, 0, 0.1); 
    border-top: 5px solid #1535ab; 
    border-radius: 50%; 
    animation: spin 1s linear infinite; 
  }

  /* Animation keyframes */
  @keyframes spin {
    from {
      transform: rotate(0deg); 
    }
    to {
      transform: rotate(360deg); 
    }
  }
    .pause-btn{
      width: 45px;
      height: 45px;
    }
    .play-btn{
      width: 50px;
      height: 50px;
    }  
    .more-p{
      font-size: 1.1rem;
      font-weight: 700;
    }
    .more-p:hover:{
      cursor:
    }
    .icons{
      font-size:1.8rem;
      margin: 40px 10px; 
      color: #1535ab;
    }
    .icons:hover{
      cursor: pointer;
    }
    .dn-load-p{
    font-size: 1.2rem;
    }
`;
