import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

/**
 *
 * @param {*} props - See Editor.jsx for props info
 * @returns React component with 2 buttons - selected effects
 */
const StyleToolbar = (props) => {
  /* ------------------------------------------------------------- */
  /* Props destructuring */
  /* ---------------------------- */
  const { styleEffects, selectedStyleEffect, setSelectedStyleEffect } = props;
  /* End of props destructuring */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Methods */
  /* ---------------------------- */
  const handleSelectEffect = (key) => {
    selectedStyleEffect === key ? setSelectedStyleEffect(0) : setSelectedStyleEffect(key);
  };
  /* End of methods */
  /* ------------------------------------------------------------- */
  /** Changes state of filter state variables in the App.js */

  return (
    <ButtonGroup>
      {Object.keys(styleEffects).map((key, index) => (
        <ToggleButton
          key={key}
          type="radio"
          variant="outline-success"
          value={styleEffects[key].value}
          checked={key === selectedStyleEffect}
          onClick={() => handleSelectEffect(key)}
        >
          {styleEffects[key].label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default StyleToolbar;
