import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SpeedTest() {
  const [speed, setSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/speedtest");

        const data = await response.json();

        setSpeed(data.download_speed);
        setPing(data.ping);
        setUpload(data.upload_speed);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      fetchSpeed();
    };
  }, []);
  return (
    <TestContainer>
      <h1>Internet Speed </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Your download speed: {speed} Mbps</p>
          <p>Your upload speed: {upload} Mbps</p>
          <p>Your ping: {ping} ms</p>
        </>
      )}
    </TestContainer>
  );
}

const TestContainer = styled.div`
  .data {
    font-size: 3rem;
    margin: 0;
  }
  .btn {
    margin-top: 0.6rem;
    font-size: 2.1rem;
    border: none;
    border-radius: 8px;
    background-color: #4caf50;
    color: white;
    padding: 5px 30px;

    &:hover {
      background-color: #45a049;
    }

    &:disabled {
      background-color: #ccc;
    }
  }
`;
