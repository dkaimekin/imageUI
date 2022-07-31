import React, {useEffect, useState} from "react";
import {Button, Form, Image, Modal, Container, Row, Spinner, Alert} from "react-bootstrap";
import cities from "./kz.json";
import managers from "./managers.json";

import "./OrderForm.css";

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
        material,
    } = props;

    const [customerName, setCustomerName] = useState();
    const [customerPhone, setCustomerPhone] = useState();
    const [orderStatusComponent, setOrderStatusComponent] = useState(<p className={"order-button"}>Заказать</p>)
    const [showOrderData, setShowOrderData] = useState(false);
    const [orderId, setOrderId] = useState(-1);
    const renderOrderData = (id) => {
        return (
            <Alert show={showOrderData} variant="success">
                <Alert.Heading>Заказ оформлен! Ваш номер заказа: <strong>{id}</strong></Alert.Heading>
            </Alert>
        )
    }
    const returnPromise = async (res) => {
        return res.json().then((result) => {
            console.log(result.id);
            if (res.ok) {
                setOrderId(result.id);
                setShowOrderData(true);
            } else {
                console.log("something went wrong")
            }

        })
    }

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
        setOrderStatusComponent(<ScaleLoader color="#fff" height={16} width={4} radius={2} margin={2}/>)
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                customer_name: customerName,
                customer_phone: customerPhone,
                image: selectedImage.id,
                wallpaper_width: wallpaperWidth,
                wallpaper_height: wallpaperHeight,
                material: material,
                is_black_and_white: selectedStyleEffect === "grayscale",
                is_sepia: selectedStyleEffect === "sepia",
                crop_coordinates: JSON.stringify(coordinates),
                edited_image: image,
            }),
        };
        fetch("http://127.0.0.1:8000/api/orders/", requestOptions)
            .then((res) => {
                    returnPromise(res);
                    if (res.ok) {
                        alert("Success!");
                        setOrderStatusComponent(<p className={"order-button"}>Заказать</p>)
                        return 0;
                    } else {
                        console.log("something went wrong");
                        console.log(res.status);
                        setOrderStatusComponent(<p className={"order-button"}>Заказать</p>);
                        return 0;
                    }
                })
            .catch((err) => {
                console.log(err);
                console.log('tried to catch an error');
                setOrderStatusComponent(<p className={"order-button"}>Заказать</p>);
            });
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
        <Modal show={showOrderForm} onHide={() => setShowOrderForm(false)}>
            <Modal.Header closeButton>ФОРМА ЗАКАЗА</Modal.Header>
            <Modal.Body>
                <Container fluid="md">
                    <Row>
                        <Form onSubmit={handleSubmit} name="orderForm">
                            <Form.Group>
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="string" onChange={(event) => handleCustomerName(event)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Телефон</Form.Label>
                                <Form.Control type="string" onChange={(event) => handleCustomerPhone(event)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Город</Form.Label>
                                <Form.Select>{renderSelectOptions(cities, "city")}</Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Примечания</Form.Label>
                                <Form.Control type="string"/>
                            </Form.Group>
                            {renderOrderData(orderId)}
                        </Form>
                    </Row>
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Button variant="success" type="submit" onClick={(e) => handleSubmit(e)}>
                        {orderStatusComponent}
                    </Button>

                </Row>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderForm;
