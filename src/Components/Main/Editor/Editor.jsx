import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Cropper } from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";
import WallpaperProperties from "./WallpaperProperties";
import OrderForm from "./OrderForm";
import StyleToolbar from "./StyleToolbar";
import { motion } from "framer-motion";

const Editor = (props) => {
  const { selectedImage } = props;
  const [image, setImage] = useState("");
  const [wallpaperHeight, setWallpaperHeight] = useState(100);
  const [wallpaperWidth, setWallpaperWidth] = useState(100);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const aspectRatio = wallpaperWidth / wallpaperHeight;

  console.log(selectedImage);
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };

  const propsForWallpaperProperties = {
    wallpaperWidth,
    setWallpaperWidth,
    wallpaperHeight,
    setWallpaperHeight,
  };
  // styles
  const [selectedStyleEffect, setSelectedStyleEffect] = useState(0);
  useEffect(() => {
    document.title = "Editor";
  }, [selectedImage]);

  const styleEffects = {
    grayscale: { label: "Черно-белый", value: 1 },
    sepia: { label: "Сепия", value: 2 },
  };

  const transformSelectedEffectToMask = (selectedStyleEffect) => {
    let filterMask = ``;
    if (selectedStyleEffect === "grayscale") {
      filterMask = `grayscale(100%)`;
      return { filter: filterMask };
    } else if (selectedStyleEffect === "sepia") {
      filterMask = `sepia(100%)`;
      return { filter: filterMask };
    } else if (selectedStyleEffect === 0) {
      filterMask = `grayscale(0%)`;
      return { filter: filterMask };
    }
    console.log("Mask: ", selectedStyleEffect);
    return { filter: filterMask };
  };

  // cropper
  const [coordinates, setCoordinates] = useState(null);
  const cropperRef = useRef(null);

  const handleSubmit = () => {
    setShowOrderForm(true);
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      setImage(cropperRef.current.getCanvas()?.toDataURL());
      console.log(coordinates);
      console.log("cropped");
    }
  };
  const propsForOrderForm = {
    showOrderForm,
    setShowOrderForm,
    selectedImage,
    image,
    style: transformSelectedEffectToMask(selectedStyleEffect),
    wallpaperWidth,
    wallpaperHeight,
    selectedStyleEffect,
    coordinates,
  };
  const propsForStyleEffect = {
    styleEffects,
    selectedStyleEffect,
    setSelectedStyleEffect,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container fluid className="mt-4">
        <Row>
          <Container fluid className="mb-4">
            <Col>
              <h1>{selectedImage.name}</h1>
            </Col>
          </Container>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Container className="mb-4">
              <Cropper
                ref={cropperRef}
                stencilProps={{ aspectRatio }}
                src={selectedImage.url}
                style={transformSelectedEffectToMask(selectedStyleEffect)}
              />
            </Container>
          </Col>
          <Col>
            <Container className="mb-4">
              <WallpaperProperties {...propsForWallpaperProperties} />
              <br />

              <Row>
                <StyleToolbar {...propsForStyleEffect} />
              </Row>
            </Container>
          </Col>

          <OrderForm {...propsForOrderForm} />
          <Row>
            <Col className="d-flex justify-content-center">
              <Button onClick={handleSubmit} className="mt-4">
                Заказать
              </Button>
            </Col>
          </Row>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Editor;
