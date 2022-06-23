import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal, Container, Row } from "react-bootstrap";

const OrderForm = (props) => {
  const {
    showOrderForm,
    setShowOrderForm,
    style,
    selectedImage,
    image,
    wallpaperWidth,
    wallpaperHeight,
    selectedStyleEffect,
    coordinates,
  } = props;

  const [customerName, setCustomerName] = useState();
  const [customerPhone, setCustomerPhone] = useState();

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };
  const handleCustomerPhone = (event) => {
    setCustomerPhone(event.target.value);
  };

  useEffect(() => {
    if (showOrderForm) document.title = "Order";
    else document.title = "Editor";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        customer_phone: customerPhone,
        image: selectedImage.id,
        wallpaper_width: wallpaperWidth,
        wallpaper_height: wallpaperHeight,
        is_black_and_white: selectedStyleEffect === "grayscale",
        is_sepia: selectedStyleEffect === "sepia",
        crop_coordinates: JSON.stringify(coordinates),
      }),
    };
    fetch("http://127.0.0.1:8000/api/orders/", requestOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Modal show={showOrderForm} onHide={() => setShowOrderForm(false)}>
      <Modal.Header closeButton>ФОРМА ЗАКАЗА</Modal.Header>
      <Modal.Body>
        <Container fluid="md">
          <Row>
            <Form onSubmit={handleSubmit} name="orderForm">
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="string" onChange={(event) => handleCustomerName(event)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Телефон</Form.Label>
                <Form.Control type="string" onChange={(event) => handleCustomerPhone(event)} />
              </Form.Group>
            </Form>
          </Row>
          <Row className="m-2 mt-4">
            <Image thumbnail src={image} style={style} />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Заказать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderForm;
