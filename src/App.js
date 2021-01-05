import { useState, useEffect } from 'react';
import shortid from 'shortid';

import Phonebook from './components/Phonebook/Phonebook';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';
import Container from './components/Container/Container';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const existContact = number => {
    return contacts.find(
      contact => contact.number.toLowerCase() === number.toLowerCase(),
    );
  };

  const addContact = (name, number) => {
    if (existContact(number)) {
      alert(`Already in contacts ${name}`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  const filterPhonebook = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')));
  }, []);

  const filteredPhonebook = filterPhonebook();

  return (
    <Container>
      <h2 className="section-title">Phonebook</h2>
      <Phonebook onSubmit={addContact} />
      <h2 className="section-title">Statistics</h2>
      <Filter value={filter} onChange={handleChange} />
      <Contacts options={filteredPhonebook} onDeleteContact={deleteContact} />
    </Container>
  );
}

export default App;
