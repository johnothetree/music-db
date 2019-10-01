DROP TABLE IF EXISTS lineup;
DROP TABLE IF EXISTS show;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS band;

CREATE TABLE band(
    band_id serial PRIMARY KEY
    ,band_name VARCHAR(50)
    ,seen_count SMALLINT DEFAULT 0
);

CREATE TABLE album(
    album_id serial PRIMARY KEY,
    band_id integer NOT NULL,
    album_name VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    notable BOOLEAN DEFAULT FALSE,
    CONSTRAINT album_band_id_fkey FOREIGN KEY(band_id)
        REFERENCES band (band_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE venue(
    venue_id serial PRIMARY KEY
    ,venue_name VARCHAR(50) NOT NULL
    ,venue_city VARCHAR(50)
    ,venue_state VARCHAR(2)
    ,venue_capacity SMALLINT
);

CREATE TABLE show(
    show_id serial PRIMARY KEY
    ,venue_id INTEGER NOT NULL
    ,show_date DATE NOT NULL
    ,CONSTRAINT show_venue_id_fkey FOREIGN KEY (venue_id)
        REFERENCES venue (venue_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE lineup(
    band_id integer NOT NULL
    ,show_id integer NOT NULL
    ,headliner BOOLEAN
    ,PRIMARY KEY(band_id, show_id)
    ,CONSTRAINT lineup_band_id_fkey FOREIGN KEY(band_id)
        REFERENCES band (band_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
    ,CONSTRAINT lineup_show_id_fkey FOREIGN KEY(show_id)
        REFERENCES show (show_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO band(band_name) VALUES
-- (E''68 ', 3),
('1,2,3 Walrus'),
('16 Bit Lolitas'),
('3LAU'),
('3OH!3'),
('7 Days In June'),
('10 Years')
;

INSERT INTO venue(venue_name, venue_city, venue_state) VALUES
('Skyway Theater', 'Minneapolis', 'MN'),
('Studio B', 'Minneapolis', 'MN'),
('First Avenue', 'Minneapolis', 'MN'),
('7th Street Entry', 'Minneapolis', 'MN'),
('The Armory', 'Minneapolis', 'MN'),
('The Garage', 'Burnsville', 'MN'),
('Caydence', 'St. Paul', 'MN'),
('Amsterdamn Bar and Hall', 'St. Paul', 'MN'),
('The Cabooze', 'Minneapolis', 'MN'),
('Fine Line', 'Minneapolis', 'MN'),
('The Myth', 'Woodbury', 'MN'),
('The Sylvee', 'Madison', 'WI'),
('Whiskey Junction', 'Minneapolis', 'MN'),
('The Fallout', 'Minneapolis', 'MN'),
('Blue Moose', 'Iowa City', 'IA'),
('The Rave', 'Milwaukee', 'WI'),
('Music Hall Minneapolis', 'Minneapolis', 'MN'),
('Red Carpet Nightclub', 'St. Cloud', 'MN'),
('Varsity Theater', 'Minneapolis', 'MN'),
('Subterranean', 'Chicago', 'IL'),
('Nomad World Pub', 'Minneapolis', 'MN'),
('Red Herring Lounge', 'Duluth', 'MN'),
('Sunnyview Expo Center', 'Oshkosh', 'WI'),
('Somerset Amphitheater', 'Somerset', 'WI'),
('Summerfest Expo Center', 'Milwaukee', 'WI'),
('Majestic Theater', 'Madison', 'WI'),
('Gabes', 'Iowa City', 'IA'),
('Opinion Brewing Company', 'St Paul', 'MN'),
('Roy Wilkins Auditorium', 'St Paul', 'MN'),
('Xcel Energy Center', 'St Paul', 'MN'),
('Canterbury Race Track', 'Shakopee', 'MN'),
('Red Rocks Amphitheater', 'Morrison', 'CO'),
('Minneapolis Convention Center', 'Minneapolis', 'MN')
;