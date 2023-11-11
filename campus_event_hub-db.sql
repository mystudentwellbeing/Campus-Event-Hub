-- Scripts for creating and populating the database:

-- creating campus_event_hub database and using it

create database campus_event_hub;

-- creating table

CREATE TABLE IF NOT EXISTS users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	is_active TINYINT(1) DEFAULT 1 NOT NULL,
	is_admin TINYINT(1) DEFAULT 0 NOT NULL,
	session_uuid VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS institutions(
	inst_id INT AUTO_INCREMENT PRIMARY KEY,
	inst_name VARCHAR(255) NOT NULL,
    inst_location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	is_active TINYINT(1) DEFAULT 1 NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
	event_id INT AUTO_INCREMENT PRIMARY KEY,
	name_of_event VARCHAR(255) NOT NULL,
	type ENUM('networking', 'campus', 'cultural', 'hobbies', 'sports', 'educational', 'nightlife', 'arts', 'wellbeing'),
	date DATE NOT NULL,
    time TIME NOT NULL,
	name_of_venue VARCHAR(60) NOT NULL,
	address VARCHAR(255) NOT NULL,
	city VARCHAR(40) NOT NULL,
	postal_code VARCHAR(10) NOT NULL,
	short_description VARCHAR(100) NOT NULL,
	description VARCHAR(255) NOT NULL,
	virtual_link VARCHAR(255) NOT NULL,
	image_url VARCHAR(255) NOT NULL,
	contact_name VARCHAR(40) NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	contact_phone VARCHAR(10) NOT NULL,
	name_organization VARCHAR(40) NOT NULL,
	price INT NOT NULL,
	event_link VARCHAR(255) NOT NULL,
	is_approved TINYINT(1) DEFAULT 0 NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    inst_id INT NOT NULL,
    CONSTRAINT fk_event_inst_id
	FOREIGN KEY (inst_id) REFERENCES institutions(inst_id)
);

CREATE TABLE IF NOT EXISTS user_events (
	user_event_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_user_events_event_id
	FOREIGN KEY (event_id) REFERENCES events (event_id),
	CONSTRAINT fk_user_events_user_id
	FOREIGN KEY (user_id) REFERENCES users (user_id)
);