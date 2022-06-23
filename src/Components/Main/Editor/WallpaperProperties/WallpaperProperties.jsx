import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const WallpaperProperties = (props) => {
  const { wallpaperWidth, setWallpaperWidth, wallpaperHeight, setWallpaperHeight } = props;

  const handleWallpaperHeight = (event) => {
    setWallpaperHeight(event.target.value);
  };
  const handleWallpaperWidth = (event) => {
    setWallpaperWidth(event.target.value);
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
            <Form.Select size="l">
              <option></option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Row>
    </Form>
  );
};

export default WallpaperProperties;
