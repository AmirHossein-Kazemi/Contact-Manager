import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getOneContact from "../../services/getOneContact";

const ContactDetail = () => {
  const [selectedContact, setSelectedContact] = useState();
  const params = useParams();

  useEffect(() => {
    const getContactDetail = async () => {
      const { data } = await getOneContact(params.id);
      setSelectedContact(data);
    };
    getContactDetail();
  }, []);

  return (
    <>
      {selectedContact ? (
        <div>
          <p>user name is : {selectedContact.name}</p>
          <p>user email is : {selectedContact.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ContactDetail;
