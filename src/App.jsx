import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from './components/Container';
import ContactEditor from './components/ContactEditor';
import ContactList from './components/ContactList';
import ContactFilter from './components/ContactFilter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const paresdContacts = JSON.parse(contacts);

    if (paresdContacts) {
      this.setState({ contacts: paresdContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (prevContacts !== nextContacts) {
      console.log(
        'Оновилось поле contacts, записую contacts в локальне сховище'
      );

      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    const contact = { id: nanoid(), name, number };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = conId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== conId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    console.log('App render');

    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactEditor onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <ContactFilter
          value={filter}
          onChange={this.changeFilter}
        ></ContactFilter>

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        ></ContactList>
      </Container>
    );
  }
}

export default App;
