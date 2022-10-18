import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './filter.module.css';

const nameFilterId = nanoid();

export default function Filter({ filterContacts, onFilterChange }){
	return(
  <>
    <label className={css.label} htmlFor={nameFilterId}>
      Find contacts by name
    </label>
    <input
      className={css.input}
      type="text"
      value={filterContacts}
      id={nameFilterId}
      onChange={onFilterChange}
    />
  </>
	)
}

Filter.propTypes = {
	onFilterChange: PropTypes.func.isRequired,
	filterContacts: PropTypes.string.isRequired
};

