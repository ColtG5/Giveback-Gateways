SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS 'gbgw471';
CREATE DATABASE 'gbgw471';
USE 'gbgw471';

CREATE TABLE 'Client' (
    'clientID' INT AUTO_INCREMENT PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Volunteer_user' (
    'vID' INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Company_user' (
    'cID' INT NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Profile' (
    'Username' varchar(25) NOT NULL,
    'Password' varchar(25) NOT NULL,
    'FirstName' varchar(25) NOT NULL,
    'LastName' varchar(25) NOT NULL,
    'Email' varchar(256) NOT NULL,
    'Phone' char(10) DEFAULT NULL,
    'Biography' varchar(150) DEFAULT NULL,
    'Location' varchar(25) NOT NULL,
    'CreationDate' date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Volunteer_profile' (
    'vUser' varchar(25) NOT NULL,
    'vID' INT NOT NULL,
    'Hours' INT DEFAULT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Company_profile' (
    'cUser' varchar(25) NOT NULL,
    'cID' INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'User_goals' (
    'vUser' varchar(25) NOT NULL,
    'Goal' varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'User_interests' (
    'vUser' varchar(25) NOT NULL,
    'Interest' varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Profile_follows' (
    'vUser' varchar(25) NOT NULL,
    'cUser' varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Volunteering_opportunity' (
    'ID' INT AUTO_INCREMENT PRIMARY KEY,
    'Title' varchar(25) NOT NULL,
    'Date' date NOT NULL,
    'Time' time NOT NULL,
    'Duration' INT NOT NULL,
    'Description' varchar(255) NOT NULL,
    'VolunteersNeeded' INT NOT NULL,
    'cUser' varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'SignedUp_Opportunities' (
    'vUser' varchar(25) NOT NULL,
    'OppID' INT NOT NULL,
    'Accepted' tinyint(1) DEFAULT 0,
    'Rejected' tinyint(1) DEFAULT 0,
    'Pending' tinyint(1) DEFAULT 1,
    'Attended' tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Message_board' (
    'boardID' INT AUTO_INCREMENT PRIMARY KEY,
    'cUser' varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Message' (
    'messageID' INT AUTO_INCREMENT PRIMARY KEY,
    'vUser' varchar(25) NOT NULL,
    'bID' INT NOT NULL,
    'Title' varchar(25) NOT NULL,
    'Content' varchar(255) NOT NULL,
    'Date' date NOT NULL,
    'Time' time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Board_follows' (
    'cUser' varchar(25) NOT NULL,
    'boardID' INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

COMMIT;
