import React from 'react';
import styled from 'styled-components';
import AppNavBar from './AppNavBar';
import GamePage from './GamePage'

export const SIDE_PADDING = "10em";

const Page = styled.div`
	margin: 4em ${SIDE_PADDING};
	background-color: inherit;
`;

function App() {
  return (
    <div className="App" style={{backgroundColor: "#C2CAD0"}}>
      <header className="App-header">
				<AppNavBar />
      </header>


			<Page>
				<GamePage/>
			</Page>
    </div>
  );
}

export default App;
