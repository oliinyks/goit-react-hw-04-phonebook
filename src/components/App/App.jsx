import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import Form from 'components/Form';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import css from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const filter = this.state.contacts.filter(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (filter.length) {
      Notiflix.Notify.failure('You already have a contact with that name');
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
    Notiflix.Notify.success('You have just created a new contact');
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
    Notiflix.Notify.success('You have just deleted a contact');
  };
  componentDidMount() {
	const parsedContact = JSON.parse(localStorage.getItem('contacts'));
  if(parsedContact){
	  this.setState({contacts: parsedContact})	
  }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <section className={css.phonebook}>
        <h1 className={css.title}>Your amazing phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <h2 className={css.subtitle}>Contacts</h2>
        {contacts.length > 0 ? (
          <>
            <Filter
              onFilterChange={this.changeFilter}
              filterContacts={filter}
            />
            <ContactList
              contactsList={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        ) : (
          <p className={css.text}>You have no contacts</p>
        )}
      </section>
    );
  }
}
export default App;
