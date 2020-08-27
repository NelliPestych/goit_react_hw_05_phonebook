import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./FadeStyles.css";
import ContactsItem from "./ContactsItem";
import PropTypes from "prop-types";

const Contacts = ({ contactsAll, onRemoveTask }) => (
<TransitionGroup component="ul" className="fade">
    {contactsAll.map(({ id, name, number }) => (
      <CSSTransition key={id} timeout={250} classNames="fade">
      <ContactsItem id={id} name={name} number={number} onRemoveTask={onRemoveTask} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

Contacts.propTypes = {
  contactsAll: PropTypes.array.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default Contacts;
