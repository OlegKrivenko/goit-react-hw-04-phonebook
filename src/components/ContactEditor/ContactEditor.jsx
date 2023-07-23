import { useState } from 'react';

import css from './ContactEditor.module.css';

const ContactEditor = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // state = { name: '', number: '' };

  const handleChange = event => {
    const { name: nameNew, value } = event.currentTarget;

    switch (nameNew) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
    }
  };
  // handleChange = event => {
  //   const { name, value } = event.currentTarget;
  //   this.setState({ [name]: value });
  // };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    resetForm(event);
  };
  // handleSubmit = event => {
  //   console.log(event);
  //   event.preventDefault();

  //   this.props.onSubmit(this.state);

  //   this.resetForm(event);
  // };

  const resetForm = event => {
    setName('');
    setNumber('');

    event.target.elements.name.value = '';
    event.target.elements.number.value = '';
  };
  // resetForm = event => {
  //   this.setState({ name: '', number: '' });

  //   event.target.elements.name.value = '';
  //   event.target.elements.number.value = '';
  // };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactEditor;

// class ContactEditor extends Component {
//   state = { name: '', number: '' };

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = event => {
//     console.log(event);
//     event.preventDefault();

//     this.props.onSubmit(this.state);

//     this.resetForm(event);
//   };

//   resetForm = event => {
//     this.setState({ name: '', number: '' });

//     event.target.elements.name.value = '';
//     event.target.elements.number.value = '';
//   };

//   render() {
//     return (
//       <form className={css.form} onSubmit={this.handleSubmit}>
//         <label className={css.label}>
//           Name
//           <input
//             className={css.input}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             onChange={this.handleChange}
//           />
//         </label>

//         <label className={css.label}>
//           Number
//           <input
//             className={css.input}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//             onChange={this.handleChange}
//           />
//         </label>

//         <button type="submit" className={css.button}>
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }
