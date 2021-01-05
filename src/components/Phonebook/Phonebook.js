import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './Phonebook.module.css';

function Phonebook({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleOnSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);
  };

  const handleChange = e => {
    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={s.phoneBookForm} onSubmit={handleOnSubmit}>
      <label className={s.phoneBookLabel}>
        Name{' '}
        <input
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
          className={s.phoneBookInput}
        />
      </label>
      <label className={s.phoneBookLabel}>
        Number{' '}
        <input
          type="text"
          value={number}
          onChange={handleChange}
          name="number"
          className={s.phoneBookInput}
        />
      </label>
      <button className={s.submitPhonebook} type="submit">
        Add Contact
      </button>
    </form>
  );
}
export default Phonebook;

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
