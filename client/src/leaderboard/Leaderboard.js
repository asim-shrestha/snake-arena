import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const Leaderboard = () => {
	const [ userData, setUserData ] = useState();

	useEffect(() => {
		setUserData([{
			name: "Asim",
			wins: 10,
			losses: 10,
			average_size: 10
		}])
	}, [])
	console.log(userData);

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Wins</th>
					<th>Losses</th>
					<th>Average Size</th>
				</tr>
			</thead>
			<tbody>
				{
					userData ? 
					userData.map((data, i) => {
						return (
							<tr key={"data" + i}>
								<td>i</td>
								<td>{data.name}</td>
								<td>{data.wins}</td>
								<td>{data.losses}</td>
								<td>{data.average_size}</td>
							</tr>
						)
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
