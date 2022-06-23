import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const StyleToolbar = (props) => {
  const { styleEffects, selectedStyleEffect, setSelectedStyleEffect } = props;
  /** Changes state of filter state variables in the App.js */
  const handleSelectEffect = (key) => {
    selectedStyleEffect === key ? setSelectedStyleEffect(0) : setSelectedStyleEffect(key);
  };
  return (
    <ButtonGroup>
      {Object.keys(styleEffects).map((key, index) => (
        <ToggleButton
          key={key}
          type="radio"
          variant="outline-primary"
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
