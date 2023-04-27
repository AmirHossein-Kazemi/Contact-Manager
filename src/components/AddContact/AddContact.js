import React, { useState } from "react";
import "./AddContact.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import addContactService from "../../services/addContactService";

const AddContact = () => {
  const [contact, setContact] = useState({ name: "", email: "" });

  const navigation = useNavigate();

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
      await addContactService(contact);
      setContact({ name: "", email: "" });
      navigation("/");
    } catch (error) {}
  };

  return (
    <form className="addContact" onSubmit={submitForm}>
      <h2>Add Contact</h2>
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
        Add
      </button>
    </form>
  );
};

export default AddContact;
