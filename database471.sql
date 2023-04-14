SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS gbgw471;
CREATE DATABASE gbgw471;
USE gbgw471;

CREATE TABLE Profile (
    Username varchar(25) NOT NULL,
    Password varchar(25) NOT NULL,
    Name varchar(25) NOT NULL,
    LastName varchar(25) DEFAULT NULL,
    Email varchar(256) NOT NULL,
    Phone char(10) DEFAULT NULL,
    Biography varchar(150) DEFAULT NULL,
    Location varchar(25) NOT NULL,
    CreationDate date NOT NULL,
    PRIMARY KEY (Username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



INSERT INTO Profile (Username, Password, Name, LastName, Email, Phone, Biography, Location, CreationDate) VALUES
('ColtG5', 'polarbear123', 'Colton', 'Gowans', 'coltongowans@gmail.com', '2234567890', 'POLAR BEARS 4 LIFE', 'Calgary', '2023-04-10'),
('gbgw123', 'lovegivingback321', 'GiveBack GateWays', '', 'givebackggw@gmail.com', '1653451234', 'We are all about giving back', 'Calgary', '2023-04-11'),
('xlishx', 'databasesrock', 'Alisha', 'Nasir', 'alisha.nasir456@gmail.com', '2876543210', 'I LOVE DATABASES', 'Calgary', '2023-04-10');

CREATE TABLE Volunteer_profile (
    vID INT AUTO_INCREMENT NOT NULL,
    vUser varchar(25) NOT NULL,
    Hours INT DEFAULT NULL,
    PRIMARY KEY (vID),
    FOREIGN KEY (vUser) REFERENCES Profile (Username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Volunteer_profile (vUser, Hours) VALUES
('ColtG5', 0),
('xlishx', 100);

CREATE TABLE Company_profile (
    cID INT AUTO_INCREMENT NOT NULL,
    cUser varchar(25) NOT NULL,
    PRIMARY KEY (cID),
    FOREIGN KEY (cUser) REFERENCES Profile (Username) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Company_profile (cUser) VALUES
('gbgw123');

CREATE TABLE User_goals (
    vUser varchar(25) NOT NULL,
    Goal varchar(25) NOT NULL,
    PRIMARY KEY (vUser, Goal),
    FOREIGN KEY (vUser) REFERENCES Volunteer_profile (vUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO User_goals (vUser, Goal) VALUES
('ColtG5', 'Graduation'),
('ColtG5', 'Software engineer');

CREATE TABLE User_interests (
    vUser varchar(25) NOT NULL,
    Interest varchar(25) NOT NULL,
    PRIMARY KEY (vUser, Interest),
    FOREIGN KEY (vUser) REFERENCES Volunteer_profile (vUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO User_interests (vUser, Interest) VALUES
('ColtG5', 'Video games'),
('ColtG5', 'Snorkeling');

CREATE TABLE Profile_follows (
    vUser varchar(25) NOT NULL,
    cUser varchar(25) NOT NULL,
    PRIMARY KEY (vUser, cUser),
    FOREIGN KEY (vUser) REFERENCES Volunteer_profile (vUser) ON DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN KEY (cUser) REFERENCES Company_profile (cUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Profile_follows (vUser, cUser) VALUES
('ColtG5', 'gbgw123'),
('xlishx', 'gbgw123');

CREATE TABLE Volunteering_opportunity (
    ID INT AUTO_INCREMENT NOT NULL,
    Title varchar(25) NOT NULL,
    Date date NOT NULL,
    Time time NOT NULL,
    Duration INT NOT NULL,
    Description varchar(255) NOT NULL,
    VolunteersNeeded INT NOT NULL,
    cUser varchar(25) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (cUser) REFERENCES Company_profile (cUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Volunteering_opportunity (Title, Date, Time, Duration, Description, VolunteersNeeded, cUser) VALUES
('Beach Cleanup', '2023-04-17', '16:00', 2, 'Help us make our citys beaches look squeaky clean', 10, 'gbgw123'),
('Orchestra hosts', '2023-04-24', '18:00', 2, 'Our citys national yearly orchestra!', 5, 'gbgw123');

CREATE TABLE SignedUp_Opportunities (
    vUser varchar(25) NOT NULL,
    OppID INT NOT NULL,
    Accepted tinyint(1) DEFAULT 0,
    Rejected tinyint(1) DEFAULT 0,
    Pending tinyint(1) DEFAULT 1,
    Attended tinyint(1) DEFAULT 0,
    PRIMARY KEY (vUser, OppID),
    FOREIGN KEY (vUser) REFERENCES Volunteer_profile (vUser) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (OppID) REFERENCES Volunteering_opportunity (ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO SignedUp_Opportunities (vUser, OppID, Accepted, Rejected, Pending, Attended) VALUES
('ColtG5', 2, 0, 0, 1, 0),
('xlishx', 1, 1, 0, 0, 0);

CREATE TABLE Message_board (
	boardID INT AUTO_INCREMENT NOT NULL,
    cUser varchar(25) NOT NULL,
    PRIMARY KEY (boardID),
    FOREIGN KEY (cUser) REFERENCES Company_profile (cUser) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Message_board (cUser) VALUES
('gbgw123');

CREATE TABLE Message (
    messageID INT AUTO_INCREMENT NOT NULL,
    username varchar(25) NOT NULL,
    bID INT NOT NULL,
    Title varchar(25) NOT NULL,
    Content varchar(255) NOT NULL,
    Date date NOT NULL,
    Time time NOT NULL,
    PRIMARY KEY (messageID),
    FOREIGN KEY (username) REFERENCES Profile (Username) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (bID) REFERENCES Message_board (boardID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Message (username, bID, Title, Content, Date, Time) VALUES
('gbgw123', 1, 'Important Update', 'Time of cleanup has changed!', '2023-04-10', '12:00'),
('gbgw123', 1, 'Change of plans', 'We have changed the location', '2023-04-10', '12:00');

CREATE TABLE Board_follows (
    vUser varchar(25) NOT NULL,
    boardID INT NOT NULL,
    PRIMARY KEY (vUser, boardID),
    FOREIGN KEY (vUser) REFERENCES Volunteer_profile (vUser) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (boardID) REFERENCES Message_board (boardID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO Board_follows (vUser, boardID) VALUES
('ColtG5', 1),
('xlishx', 1);

COMMIT;
