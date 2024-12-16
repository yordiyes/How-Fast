import styled from "styled-components";
import SpeedTest from "./SpeedTest";

function App() {
  return (
    <Container>
      <SpeedTest />
    </Container>
  );
}
const Container = styled.div`
  padding: 0;
  margin: 0;
  background-color: rgb(188, 182, 189);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default App;
