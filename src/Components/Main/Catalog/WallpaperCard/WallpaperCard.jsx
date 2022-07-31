import React from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const WallpaperCard = ({ id, setSelectedImage, imageObject }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: "216pt" }}
      className="p-3"
      onClick={() => {
        setSelectedImage(imageObject);

        navigate("/editor", { replace: true });
      }}
    >
      {/* <Card.Img variant="top" src={require("../../../../../Images/placeholder-image.webp")}></Card.Img> */}
      <Card.Img
        variant="top"
        src={imageObject.url}
        style={{ width: "100", height: "144pt", objectFit: "cover" }}
      ></Card.Img>

      <Card.ImgOverlay className="d-flex flex-column-reverse">
        <Container className="d-flex justify-content-end">
          <Card.Title style={{ background: "#2a2a2a", color: "white", padding: 3 }}>{imageObject.name}</Card.Title>
        </Container>
      </Card.ImgOverlay>
    </Card>
  );
};

export default WallpaperCard;
