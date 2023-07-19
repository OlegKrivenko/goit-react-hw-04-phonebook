import css from './ContactList.module.css';
import Contact from '../Contact';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.list}>
    {contacts.map(({ id, name, number }) => (
      <Contact
        key={id}
        id={id}
        name={name}
        number={number}
        onDeleteContact={onDeleteContact}
      />
    ))}
  </ul>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func,
};
