SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS 'gbgw471';
CREATE DATABASE 'gbgw471';
USE 'gbgw471';

CREATE TABLE 'Client' (
    'clientID' char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Volunteer_user' (
    'vID' char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE 'Company_user' (
    'cID' char(10) NOT NULL 
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

