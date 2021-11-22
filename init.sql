CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  deviceId VARCHAR(255) NOT NULL,
  floatlat DOUBLE PRECISION,
  floatlon DOUBLE PRECISION,
  incidenttype VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO posts (name, deviceId, floatLat, floatlon, incidenttype, title)
VALUES  ('', '', , , '', '');