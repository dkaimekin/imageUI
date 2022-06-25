import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import textures from "./textures.json";

const WallpaperProperties = (props) => {
  const { wallpaperWidth, setWallpaperWidth, wallpaperHeight, setWallpaperHeight, setPrice, setTexture } = props;
  const changePrice = (height, width) => {
    const price = Math.ceil((height / 100) * (width / 100) * 5000);
    return price;
  };

  const handleWallpaperHeight = (event) => {
    setWallpaperHeight(event.target.value);
    setPrice(changePrice(event.target.value, wallpaperWidth));
  };
  const handleWallpaperWidth = (event) => {
    setWallpaperWidth(event.target.value);
    setPrice(changePrice(wallpaperHeight, event.target.value));
  };

  const renderSelectOptions = (array, element) => {
    const optionsArray = [];
    Object.keys(array).map((key, item) => {
      optionsArray.push(<option>{array[key][element]}</option>);

      return 0;
    });
    return optionsArray;
  };

  return (
    <Form>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>Высота, см</Form.Label>
          <Form.Control
            type="number"
            min={10}
            value={wallpaperHeight}
            onChange={(event) => handleWallpaperHeight(event)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Ширина, см</Form.Label>
          <Form.Control
            id="width_form"
            type="number"
            min={10}
            value={wallpaperWidth}
            onChange={(event) => handleWallpaperWidth(event)}
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col}>
            <Form.Label lg={2} column="md">
              Материал
            </Form.Label>
            <Form.Select
              size="l"
              onChange={(event) => {
                setTexture(`texture-${event.target.value}`);
              }}
            >
              {renderSelectOptions(textures, "name")}
            </Form.Select>
          </Form.Group>
        </Row>
      </Row>
    </Form>
  );
};

export default WallpaperProperties;
