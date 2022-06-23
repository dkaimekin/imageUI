import React from "react";
import { Container, Row } from "react-bootstrap";
import { ScaleLoader } from "react-spinners";

const LoadingScreen = ({ status }) => {
  const getMessage = (status) => {
    if (status === 0) {
      return "Получение данных";
    } else if (status === 1) {
      return "Эта страница в разработке.";
    } else {
      return "404: Страница не найдена";
    }
  };
  return (
    <Container style={{ height: 600 }} className="d-flex justify-content-center">
      <Row className="align-self-center">
        <ScaleLoader color="#008749" height={35} width={4} radius={2} margin={2} />
      </Row>{" "}
      <Row className="align-self-center">
        <h1>{getMessage(status)}</h1>
      </Row>
    </Container>
  );
};

export default LoadingScreen;
