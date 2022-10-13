import React from 'react';
import PropTypes from 'prop-types';
import css from './contactList.module.css';

export default function ContactList({ contactsList, onDeleteContact }){
	return(
  <ul className={css.items}>
    {contactsList.map(({ id, name, number }) => (
      <li className={css.item} key={id}>
        <p>
         {name}: {number}
        </p>
        <button
          className={css.button}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
	)
}

ContactList.propTypes = {
	contactsList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		 })
		).isRequired,
	onDeleteContact: PropTypes.func.isRequired,
}