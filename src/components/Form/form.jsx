import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './form.module.css';

export default function Form({ onSubmit, contactsName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleInputChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const filterName = contactsName.some(
      contactName => contactName.toLowerCase() === name.toLowerCase()
    );

	 if (filterName) {
		return  Notiflix.Notify.failure('You already have a contact with that name');
    }

	 const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmit(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nameInputId}>
        Name
      </label>
      <input
        className={css.input}
        type="text"
        value={name}
        onChange={handleInputChange}
        name="name"
        id={nameInputId}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.label} htmlFor={numberInputId}>
        Number
      </label>
      <input
        className={css.input}
        type="tel"
        value={number}
        onChange={handleInputChange}
        name="number"
        id={numberInputId}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contactsName: PropTypes.arrayOf(PropTypes.string.isRequired),
};
