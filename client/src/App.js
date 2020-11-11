import AppNavBar from './AppNavBar';
import Grid from './Grid'
import styled from 'styled-components';

export const SIDE_PADDING = "10em"
const Content = styled.div`
	margin: 4em ${SIDE_PADDING};
	background-color: inherit;
	display: flex;
	justify-content:center;
`

function App() {
  return (
    <div className="App" style={{backgroundColor: "#C2CAD0"}}>
      <header className="App-header">
				<AppNavBar padding={SIDE_PADDING} />
      </header>


			<Content>
				<Grid nRows={5} nCols={5}/>
			</Content>
    </div>
  );
}

export default App;
