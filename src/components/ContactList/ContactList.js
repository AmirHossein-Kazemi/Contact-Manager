import React, { useEffect, useState } from "react";
import "./contactList.css";
import userimage from "../../assets/image/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getContactsService from "../../services/getContactsService";
import deleteContactService from "../../services/deleteContactService";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await getContactsService();
      setContacts(data);
      setAllContacts(data);
    };
    try {
      getContacts();
    } catch (error) {
      toast.error("Contacts Data are'nt Loading");
    }
  }, []);

  const deleteContactHandler = async (contactId) => {
    try {
      await deleteContactService(contactId);
      const filteredContacts = contacts.filter((s) => s.id !== contactId);
      setContacts(filteredContacts);
    } catch (error) {
      toast.error("Can not Delete this Contact");
    }
  };

  const searchHandler = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    if (search !== "") {
      const filteredContacts = allContacts.filter((s) => {
        return Object.values(s).join(" ").toLowerCase().includes(searchTerm);
      });
      setContacts(filteredContacts);
    } else {
      setContacts(allContacts);
    }
  };

  return (
    <section className="contactList">
      <div className="listHeader">
        <h2>Contacts</h2>
        <Link to="/add">
          <button className="btn">Add Contacts</button>
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={searchHandler}
          className="search"
        />
      </div>
      {contacts ? (
        contacts.map((contact) => {
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
                  onClick={() => deleteContactHandler(contact.id)}
                  className="btn btn-red"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading ...</p>
      )}
    </section>
  );
};

export default ContactList;
