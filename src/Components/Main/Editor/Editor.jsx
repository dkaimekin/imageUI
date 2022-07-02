import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row, Badge } from "react-bootstrap";
import { Cropper, RectangleStencil, retrieveSizeRestrictions } from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";
import WallpaperProperties from "./WallpaperProperties";
import OrderForm from "./OrderForm";
import StyleToolbar from "./StyleToolbar";
import { motion } from "framer-motion";

const Editor = (props) => {
  /* ------------------------------------------------------------- */
  /* Props destructuring */
  /* ---------------------------- */
  const { selectedImage } = props;
  /* End of props destructuring */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* State info */
  /* ---------------------------- */
  const [image, setImage] = useState("");
  const [wallpaperHeight, setWallpaperHeight] = useState(100);
  const [wallpaperWidth, setWallpaperWidth] = useState(100);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [price, setPrice] = useState(5000);
  const [texture, setTexture] = useState("texture-41600");
  const [selectedStyleEffect, setSelectedStyleEffect] = useState(0);
  const aspectRatio = wallpaperWidth / wallpaperHeight;
  // cropper state
  const [coordinates, setCoordinates] = useState(null);
  const cropperRef = useRef(null);
  // styles state
  const styleEffects = {
    grayscale: { label: "Черно-белый", value: 1 },
    sepia: { label: "Сепия", value: 2 },
  };
  /* End of state info */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Hooks */
  /* ---------------------------- */
  /**
   * Function for preventing a reload of the editor page
   * @param {*} event Reloading page
   * @returns An alert with reload confirmation menu
   */
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };
  /* Change document title to editor - useless, mostly */
  useEffect(() => {
    document.title = "Editor";
  }, [selectedImage]);
  /* End of hooks */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Methods */
  /* ---------------------------- */
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
  /* For cropper */
  const flip = (horizontal, vertical) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };
  const percentsRestriction = (state) => {
    const settings = { minWidth: 10, minHeight: 10, maxWidth: 100, maxHeight: 100 };
    const { minWidth, minHeight, maxWidth, maxHeight } = retrieveSizeRestrictions(settings);
    return {
      minWidth: (minWidth / 100) * cropperRef.current.getImage().width,
      minHeight: (minHeight / 100) * cropperRef.current.getImage().height,
      maxWidth: (maxWidth / 100) * cropperRef.current.getImage().width,
      maxHeight: (maxHeight / 100) * cropperRef.current.getImage().height,
    };
  };
  /* End of methods*/
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Props for other components */
  /* ---------------------------- */
  const propsForWallpaperProperties = {
    wallpaperWidth,
    setWallpaperWidth,
    wallpaperHeight,
    setWallpaperHeight,
    setPrice,
    setTexture,
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
    price,
    texture,
  };
  const propsForStyleEffect = {
    styleEffects,
    selectedStyleEffect,
    setSelectedStyleEffect,
  };
  /* End of props for other components */
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */
  /* Submission handlers */
  /* ---------------------------- */
  const handleSubmit = () => {
    setShowOrderForm(true);
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      setImage(cropperRef.current.getCanvas()?.toDataURL());
      console.log(coordinates);
      console.log("cropped");
    }
  };
  /* End of submission handlers */
  /* ------------------------------------------------------------- */

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
                sizeRestrictions={percentsRestriction}
                stencilProps={{ aspectRatio: aspectRatio, previewClassName: texture }}
                stencilComponent={RectangleStencil}
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
                <ButtonGroup>
                  <Button onClick={() => flip(true, false)}>Отразить по горизонтали</Button>
                  <Button onClick={() => flip(false, true)}>Отразить по вертикали</Button>
                </ButtonGroup>
                <StyleToolbar {...propsForStyleEffect} />
              </Row>
              <Row>
                <Badge bg="secondary">{price}</Badge>
              </Row>
            </Container>
          </Col>
          {showOrderForm ? <OrderForm {...propsForOrderForm} /> : <></>}

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
