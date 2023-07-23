import { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from './components/Container';
import ContactEditor from './components/ContactEditor';
import ContactList from './components/ContactList';
import ContactFilter from './components/ContactFilter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsLocalStorage = localStorage.getItem('contacts');
    const paresdContacts = JSON.parse(contactsLocalStorage);

    return paresdContacts.length !== 0
      ? paresdContacts
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  });
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   // console.log('App componentDidMount');

  //   const contacts = localStorage.getItem('contacts');
  //   const paresdContacts = JSON.parse(contacts);

  //   if (paresdContacts) {
  //     this.setState({ contacts: paresdContacts });
  //   }
  // }

  useEffect(() => {
    console.log('Оновилось поле contacts, записую contacts в локальне сховище');

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('App componentDidUpdate');

  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (prevContacts !== nextContacts) {
  //     console.log(
  //       'Оновилось поле contacts, записую contacts в локальне сховище'
  //     );

  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  const addContact = ({ name, number }) => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    const contact = { id: nanoid(), name, number };
    setContacts(prev => [...prev, contact]);
  };

  // addContact = ({ name, number }) => {
  //   const isExist = this.state.contacts.find(
  //     contact => contact.name.toLowerCase() === name.toLowerCase()
  //   );

  //   if (isExist) {
  //     Notify.failure(`${name} is already in contacts`);
  //     return;
  //   }

  //   const contact = { id: nanoid(), name, number };
  //   this.setState(({ contacts }) => ({
  //     contacts: [contact, ...contacts],
  //   }));
  // };

  const deleteContact = conId => {
    setContacts(prev => prev.filter(contact => contact.id !== conId));
  };

  // deleteContact = conId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== conId),
  //   }));
  // };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // changeFilter = event => {
  //   this.setState({ filter: event.currentTarget.value });
  // };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // getVisibleContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactEditor onSubmit={addContact} />

      <h2>Contacts</h2>
      <ContactFilter value={filter} onChange={changeFilter}></ContactFilter>

      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      ></ContactList>
    </Container>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     // console.log('App componentDidMount');

//     const contacts = localStorage.getItem('contacts');
//     const paresdContacts = JSON.parse(contacts);

//     if (paresdContacts) {
//       this.setState({ contacts: paresdContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('App componentDidUpdate');

//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (prevContacts !== nextContacts) {
//       console.log(
//         'Оновилось поле contacts, записую contacts в локальне сховище'
//       );

//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const isExist = this.state.contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (isExist) {
//       Notify.failure(`${name} is already in contacts`);
//       return;
//     }

//     const contact = { id: nanoid(), name, number };
//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };

//   deleteContact = conId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== conId),
//     }));
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     console.log('App render');

//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Container>
//         <h1>Phonebook</h1>
//         <ContactEditor onSubmit={this.addContact} />

//         <h2>Contacts</h2>
//         <ContactFilter
//           value={filter}
//           onChange={this.changeFilter}
//         ></ContactFilter>

//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         ></ContactList>
//       </Container>
//     );
//   }
// }
