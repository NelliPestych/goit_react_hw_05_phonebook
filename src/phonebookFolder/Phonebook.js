import React from "react";
import AddNomber from "../addnomberFolder/addNomber";
import createNumber from "../createnomberFolder/createNumber";
import Contacts from "../contactsFolder/Contacts";
import Filter from "../filterFolder/Filter";
import Notification from "../notifyFolder/Notification";
import { CSSTransition } from "react-transition-group";
import "./NotifyStyles.css";
import "./MyStyles.css";

export default class Phonebook extends React.Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    number: "",
    search: [],
    notify: false,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  notifyChange = () => {
    this.setState({
      notify: true,
    });
  }

  notifyTimeout = () => {
    setTimeout(() => {
      this.setState({
        notify: false,
      });
    }, 1500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = () => {
    const phoneNumber = createNumber();
    this.setState((prevState) => {
      const contactNames = prevState.contacts.map(contact => contact.name);
      if (contactNames.some(theName => theName === prevState.name)) {
        this.notifyChange();
        this.notifyTimeout();
      }
      else return {
        contacts: [
          { id: phoneNumber, name: this.state.name, number: this.state.number },
          ...prevState.contacts,
        ],
      };
    });
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  inputChangeName = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  inputChangeNumber = (e) => {
    e.preventDefault();
    this.setState({ number: e.target.value });
  };

  inputChangeContact = (e) => {
    e.preventDefault();
    const findNumber = this.state.contacts.filter(
      (contact) => contact.name === e.target.value
    );
    this.setState({ search: [...findNumber] });
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <CSSTransition
          in={this.state.notify === true}
          appear={true}
          classNames="notify"
          timeout={5000}
          unmountOnExit
        >
          <Notification className="notify"/>
        </CSSTransition>
        <CSSTransition
          in={true}
          appear={true}
          classNames="my"
          timeout={500}
          unmountOnExit
        >
          <h1>Phonebook</h1>
        </CSSTransition>
        <p>Name</p>
        <input
          type="text"
          value={this.state.name}
          onChange={this.inputChangeName}
        />
      <p>Number</p>
        <input
          type="text"
          value={this.state.number}
          onChange={this.inputChangeNumber}
        />
        {this.state.name && this.state.number && (
          <AddNomber nomberEditor={this.addContact} />
        )}
        <p>Search</p>
        <Filter searchAll={this.state.search} />
        <input type="text" onChange={this.inputChangeContact} />
        <p>Contacts</p>
        <Contacts contactsAll={contacts} onRemoveTask={this.removeContact} />
      </div>
    );
  }
}
