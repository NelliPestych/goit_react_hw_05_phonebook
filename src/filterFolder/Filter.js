import React from "react";
import PropTypes from "prop-types";

const Filter = ({ searchAll }) => (
  <ul>
    {searchAll.map(({ id, name, number }) => (
      <li key={id}>
        <p>{name} {number}</p>
      </li>
    ))}
  </ul>
);

Filter.propTypes = {
  searchAll: PropTypes.array.isRequired,
};
export default Filter;