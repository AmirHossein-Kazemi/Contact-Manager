import React from "react";
import { useLocation } from "react-router-dom";

const ContactDetail = (contact) => {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      <p>user name is : {contact.name}</p>
      <p>user email is : {contact.email}</p>
    </div>
  );
};

export default ContactDetail;
