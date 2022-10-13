import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Form from 'components/Form';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import useLocalSorage from '../../hooks/useLocalStorage';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] =  useLocalSorage();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = newContact => {
	setContacts(prevState => [...prevState, newContact]);
    Notiflix.Notify.success('You have just created a new contact');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(({ id }) => id !== contactId)
    );
    Notiflix.Notify.success('You have just deleted a contact');
  };
  
  const contactsName = contacts.map(contact => contact.name);

  return (
    <section className={css.phonebook}>
      <h1 className={css.title}>Your amazing phonebook</h1>
      <Form onSubmit={formSubmitHandler} contactsName={contactsName}/>

      <h2 className={css.subtitle}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter onFilterChange={changeFilter} filterContacts={filter} />
          <ContactList
            contactsList={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      ) : (
        <p className={css.text}>You have no contacts</p>
      )}
    </section>
  );
}
