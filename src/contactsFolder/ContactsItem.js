import React from "react";
import PropTypes from "prop-types";

const ContactsItem = ({ id, name, number, onRemoveTask }) => (
    <li key={id}>
      <p>
        {name} {number}
      </p>
      <button type="button" onClick={() => onRemoveTask(id)}>
        Удалить
      </button>
    </li>
);

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default ContactsItem;