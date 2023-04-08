import React from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  let { username } = useParams();

  return (
    <>
      <div>This is {username}'s profile!</div>
    </>
  );
};

export default ProfilePage;
