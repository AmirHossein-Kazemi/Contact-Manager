import React from "react";
import "./contactList.css";
import userimage from "../../assets/image/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png";
import { Link } from "react-router-dom";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <section className="contactList">
      <div className="listHeader">
        <h2>Contacts</h2>
        <Link to="/add">
          <button className="btn">Add Contacts</button>
        </Link>
      </div>
      {contacts.map((contact) => {
        return (
          <div key={contact.id} className="item">
            <Link to={{ pathname: `user/${contact.id}`, state: contact }}>
              <div className="item-List">
                <img src={userimage} alt="user-img" />
                <div>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
              </div>
            </Link>
            <div className="item-button">
              <Link to={`/edit/${contact.id}`}>
                <button className="editBtn">Edit</button>
              </Link>
              <button
                onClick={() => onDelete(contact.id)}
                className="btn btn-red"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ContactList;
