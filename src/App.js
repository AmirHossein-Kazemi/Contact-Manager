import "./App.css";
import Layout from "./Layout/Layout";
import AddContact from "./components/AddContact/AddContact";
import ContactList from "./components/ContactList/ContactList";
import { Route, Routes } from "react-router-dom";
import ContactDetail from "./components/Contact Detail/ContactDetail";
import EditContact from "./components/EditContact/EditContact";

function App() {
  return (
    <main className="App">
      <Layout>
        <Routes>
          <Route path="/add" element={<AddContact />} />
          <Route path="/" element={<ContactList />} />
          <Route path="/user/:id" element={<ContactDetail />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
