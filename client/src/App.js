import React, {useState} from 'react';
import styled from 'styled-components';
import AppNavBar from './AppNavBar';
import GamePage from './gamepage/GamePage'
import TutorialModal from './TutorialModal'

export const SIDE_PADDING = "10em";

const Page = styled.div`
	margin: 4em ${SIDE_PADDING};
	background-color: inherit;
`;

function App() {
	const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="App" style={{backgroundColor: "#38a1f2"}}>
      <header className="App-header">
				<AppNavBar />
      </header>
			<TutorialModal show={showTutorial} setShow={setShowTutorial}/>

			<Page>
				<GamePage/>
			</Page>
    </div>
  );
}

export default App;
