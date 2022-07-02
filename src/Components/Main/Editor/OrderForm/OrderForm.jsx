import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal, Container, Row, FloatingLabel } from "react-bootstrap";
import cities from "./kz.json";
import managers from "./managers.json";
import EmailRegex from "./misc/EmailValidation.js";
import "./OrderForm.css";

/**
 *
 * @param {Object} props See Editor.jsx for props information
 * @returns React modal window (contains name, phone, city, email input fields, and the image preview)
 */
const OrderForm = (props) => {
  /* ------------------------------------------------------------- */
  /* Props destructuring */
  /* ---------------------------- */
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
    texture,
  } = props;
  /* End of props destructuring */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* State info */
  /* ---------------------------- */
  const [customerName, setCustomerName] = useState();
  const [customerPhone, setCustomerPhone] = useState();
  const [validEmail, setValidEmail] = useState(false);
  /* End of state info */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Hooks */
  /* ---------------------------- */
  useEffect(() => {
    if (showOrderForm) document.title = "Order";
    else document.title = "Editor";
  });
  /* End of hooks */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Form handlers */
  /* ---------------------------- */
  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };
  const handleCustomerPhone = (event) => {
    setCustomerPhone(event.target.value);
  };
  /** Function that handles email validation
   * Format of email: xxx@xxx.xxx OR xxx@xxx.xx*/
  const handleEmailValidation = (event) => {
    const emailAddress = event.target.value;
    if (EmailRegex.test(emailAddress) || emailAddress.length === 0) {
      setValidEmail(true);
      return;
    }
    console.log("Invalid email");
    setValidEmail(false);
  };
  /* End of form handlers */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Submit handling */
  /* ---------------------------- */
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
    fetch("http://localhost:8000/api/orders/", requestOptions)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  /* End of submit handling */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Custom methods */
  /* ---------------------------- */
  const renderSelectOptions = (array, element) => {
    const optionsArray = [];
    Object.keys(array).map((key, item) => {
      optionsArray.push(<option>{array[key][element]}</option>);

      return 0;
    });
    return optionsArray;
  };
  /* End of custom methods*/
  /* ------------------------------------------------------------- */

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
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Select>{renderSelectOptions(cities, "city")}</Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Manager</Form.Label>
                <Form.Select>{renderSelectOptions(managers, "name")}</Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Имя"
                    // pattern="/.+@.+\.[A-Za-z]+$/"
                    onChange={(event) => {
                      handleEmailValidation(event);
                    }}
                    isInvalid={!validEmail}
                  />
                </FloatingLabel>
              </Form.Group>
            </Form>
          </Row>
          <Row className="m-2 mt-4" id="order_image">
            <div className={texture} style={{}}>
              <Image thumbnail src={image} style={style} className={texture} />
            </div>
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
