import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import getOneContact from "../../services/getOneContact";
import updateContact from "../../services/updateContact";

const EditContact = () => {
  const [contact, setContact] = useState({ name: "", email: "" });

  const navigation = useNavigate();
  const params = useParams();

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
    console.log(contact);
  };

  const submitForm = async (e) => {
    if (!contact.name || !contact.email) {
      e.preventDefault();
      toast.warning("please fill the Name & Email");
      return;
    }
    toast.success("Contact Added");
    e.preventDefault();
    try {
      await updateContact(contact, params.id);
      navigation("/");
    } catch (error) {}
  };

  useEffect(() => {
    const localFetch = async () => {
      try {
        const { data } = await getOneContact(params.id);
        setContact(data);
      } catch (error) {}
    };
    localFetch();
  }, []);

  return (
    <form className="addContact" onSubmit={submitForm}>
      <h2>Edit Contact</h2>
      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={contact.name}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={contact.email}
          name="email"
          placeholder="Email"
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <button className="btn" type="submit">
        Update Contact
      </button>
    </form>
  );
};

export default EditContact;
