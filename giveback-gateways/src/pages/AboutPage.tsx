import React from "react";
import Footer from "../components/Footer";
import TitleHeader from "../components/TitleHeader";
import AlishaNasir from "../../../AlishaNasir.jpeg";
import ColtonGowans from "../../../ColtonGowans.jpeg";
import HabibaAbuelazm from "../../../HabibaAbuelazm.jpeg";

const AboutPage = () => {
  return (
    <>
      <TitleHeader />
      <div style={styles.container}>
        <h1 style={styles.heading}>About Us</h1>
        <p style={styles.paragraph}>We are a team of university students who are passionate about giving back to our community.</p>
        <p style={styles.paragraph}>Our mission is to help like-minded students succeed by providing them with a platform for volunteer opportunites. Not only is our mission to empower students, but we are creating a supportive environment where non-profit organizations can promote their opportunites.</p>
        <p style={styles.paragraph}>Contact us to learn more about our services and how we can help you achieve your goals.</p>
        <h1 style={styles.heading}>The Team</h1>
        <img src={AlishaNasir} alt="Alisha Nasir" style={{ width: "25%", height: "auto"}}/>
        <h1 style={styles.imageTitle}>Alisha Nasir</h1>
        <p style={styles.paragraph}>Alisha is a student in her second year of Computer Science. She enjoys to listen to music in her free time. She aspires to be a successful software engineer in the near future.</p>
        <img src={ColtonGowans} alt="Colton Gowans" style={{ width: "25%", height: "auto", marginTop:"50px" }}/>
        <h1 style={styles.imageTitle}>Colton Gowans</h1>
        <p style={styles.paragraph}>Colton is also in his second year of Computer Science studies. He enjoys playing video games in his downtime. He is passionate about cybersecurity and wishes to be a software engineer.</p>
        <img src={HabibaAbuelazm} alt="Habiba Abuelazm" style={{ width: "25%", height: "auto", marginTop:"50px" }}/>
        <h1 style={styles.imageTitle}>Habiba Abuelazm</h1>
        <p style={styles.paragraph}>Habiba is in her second year of Computer Science. She enjoys reading and going on nature walks in her free time. She aspires to work as a software engineer.</p>
      </div>
    </>
  );
};

export default AboutPage;

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px 20px",
  },
  heading: {
    marginTop: '20px',
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.5",
  },
  imageTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  }
};