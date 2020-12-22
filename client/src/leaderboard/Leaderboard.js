import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

const Leaderboard = () => {
	const [userData, setUserData] = useState();
	console.log(`ATTEMPTING TO SEND TO PORT:${process.env.PORT}`);
	useEffect(() => {
		Axios.get(`https://snake-arena.herokuapp.com/leaderboard/`)
			.then(res => {
				const data = res.data.sort((a, b) => (a.wins < b.wins) ? 1 : -1);
				setUserData(data);
			});
	}, []);
	console.log(userData);

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Games Played</th>
					<th>Losses</th>
					<th>Wins</th>
				</tr>
			</thead>
			<tbody>
				{
					userData ?
						userData.map((data, i) => {
							return (
								<tr key={"data" + i}>
									<td>{i + 1}</td>
									<td>{data.name}</td>
									<td>{data.num_games}</td>
									<td>{data.losses}</td>
									<td>{data.wins}</td>
								</tr>
							);
						})
						:
						<tr>
							<td>1</td>
							<td>Loading...</td>
							<td>Loading...</td>
							<td>Loading...</td>
							<td>Loading...</td>
						</tr>
				}
			</tbody>
		</Table>
	);
};

export default Leaderboard;
