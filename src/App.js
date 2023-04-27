import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Routes } from "react-router-dom";
import ContactDetail from "./components/Contact Detail/ContactDetail";
import getContactsService from "./services/getContactsService";
import { toast } from "react-toastify";
import deleteContactService from "./services/deleteContactService";
import addContactService from "./services/addContactService";
import EditContact from "./components/EditContact/EditContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async (contact) => {
    try {
      const { data } = await addContactService(contact);
      setContacts([...contacts, data]);
    } catch (error) {}
  };

  const deleteContactHandler = async (contactId) => {
    try {
      await deleteContactService(contactId);
      const filteredContacts = contacts.filter((s) => s.id !== contactId);
      setContacts(filteredContacts);
    } catch (error) {
      toast.error("Can not Delete this Contact");
    }
  };

  const editContactHandler = ()=>{
    
  }

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await getContactsService();
      setContacts(data);
    };
    try {
      getContacts();
    } catch (error) {
      toast.error("Contacts Data are'nt Loading");
    }
  }, []);

  return (
    <main className="App">
      <Layout>
        <Routes>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactList
                contacts={contacts}
                onDelete={deleteContactHandler}
              />
            }
          />
          <Route path="/user/:id" element={<ContactDetail />} />
          <Route
            path="/edit/:id"
            element={<EditContact onEdit={editContactHandler} />}
          />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
