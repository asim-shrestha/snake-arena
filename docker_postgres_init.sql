CREATE TABLE leaderboard
(
    id bigint NOT NULL,
	 name text NOT NULL,
    wins bigint NOT NULL,
	 losses bigint NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY (id)
);

INSERT INTO leaderboard(id, name, wins, losses) VALUES
 (1, 'Greg Baker', 10, 0),
 (2, 'Asim Shrestha', 5, 1),
 (3, 'Joey Shen', 0, 10);