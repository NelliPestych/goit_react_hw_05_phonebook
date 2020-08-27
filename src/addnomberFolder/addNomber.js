import React from "react";
import PropTypes from "prop-types";

export default function AddNomber({ nomberEditor }) {
    return (
        <div>
            <button type="submit" onClick={nomberEditor}>ДОБАВИТЬ</button>
        </div>
    )
}

AddNomber.propTypes = {
    nomberEditor: PropTypes.func.isRequired,
  };