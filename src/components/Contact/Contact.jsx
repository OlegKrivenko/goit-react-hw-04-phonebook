import css from './Contact.module.css';
import PropTypes from 'prop-types';

const Contact = ({ id, name, number, onDeleteContact }) => {
  return (
    <li id={id} className={css.contact}>
      <div className={css.box}>
        {name}: {number}
        <button
          type="button"
          className={css.button}
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Contact;

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
