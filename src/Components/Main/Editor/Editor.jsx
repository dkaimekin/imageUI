import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Col, Container, Row, Badge, Alert} from "react-bootstrap";
import {
    Cropper,
    RectangleStencil,
    retrieveSizeRestrictions,
    CropperState,
    CoreSettings, ImageRestriction
} from "react-advanced-cropper";
import {ScaleLoader} from 'react-spinners'

import "react-advanced-cropper/dist/style.css";
import WallpaperProperties from "./WallpaperProperties";
import OrderForm from "./OrderForm";
import StyleToolbar from "./StyleToolbar";
import {motion} from "framer-motion";

const Editor = (props) => {
    const {selectedImage} = props;
    const [image, setImage] = useState("");
    const [wallpaperHeight, setWallpaperHeight] = useState(100);
    const [wallpaperWidth, setWallpaperWidth] = useState(100);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [price, setPrice] = useState(5500);
    const [material, setMaterial] = useState("texture-0805-00");

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


    // styles
    const [selectedStyleEffect, setSelectedStyleEffect] = useState(0);
    useEffect(() => {
        document.title = "Editor";
    }, [selectedImage]);

    const styleEffects = {
        grayscale: {label: "Черно-белый", value: 1},
        sepia: {label: "Сепия", value: 2},
    };

    const transformSelectedEffectToMask = (selectedStyleEffect) => {
        let filterMask = ``;
        if (selectedStyleEffect === "grayscale") {
            filterMask = `grayscale(100%)`;
            return {filter: filterMask};
        } else if (selectedStyleEffect === "sepia") {
            filterMask = `sepia(100%)`;
            return {filter: filterMask};
        } else if (selectedStyleEffect === 0) {
            filterMask = `grayscale(0%)`;
            return {filter: filterMask};
        }
        console.log("Mask: ", selectedStyleEffect);
        return {filter: filterMask};
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
        price,
        material,
    };
    const propsForStyleEffect = {
        styleEffects,
        selectedStyleEffect,
        setSelectedStyleEffect,
    };
    const flip = (horizontal, vertical) => {
        if (cropperRef.current) {
            cropperRef.current.flipImage(horizontal, vertical);
        }
    };
    const percentsRestriction = (state) => {
        const settings = {minWidth: 10, minHeight: 10, maxWidth: 100, maxHeight: 100};
        const {minWidth, minHeight, maxWidth, maxHeight} = retrieveSizeRestrictions(settings);
        return {
            minWidth: (minWidth / 100) * cropperRef.current.getImage().width,
            minHeight: (minHeight / 100) * cropperRef.current.getImage().height,
            maxWidth: (maxWidth / 100) * cropperRef.current.getImage().width,
            maxHeight: (maxHeight / 100) * cropperRef.current.getImage().height,
        };
    };

    const resize = ({width, height, left, top}) => {
        if (cropperRef.current) {
            cropperRef.current.setCoordinates({
                width: width,
                height: height,
                left: left,
                top: top
            })
        }
    };

    const defaultSize = ({imageSize, visibleArea}) => {
        return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
        };
    };

    const propsForWallpaperProperties = {
        wallpaperWidth,
        setWallpaperWidth,
        wallpaperHeight,
        setWallpaperHeight,
        setPrice,
        setTexture: setMaterial,
        resize
    };

    const getSelectedImageName = (name) => {
        return name.length > 20 ?  'Загруженное изображение' : name;
    }

    useEffect(() => {
        resize(800, 600, 0, 0)
    }, [wallpaperWidth, wallpaperHeight])

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Container fluid className="mt-4">
                <Row>
                    <Container fluid className="mb-4">

                    </Container>
                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} >

                        <Container className="mb-4">
                            <Cropper
                                ref={cropperRef}
                                sizeRestrictions={percentsRestriction}
                                imageRestriction={ImageRestriction.fillArea}
                                stencilProps={{aspectRatio: aspectRatio, previewClassName: material}}
                                stencilComponent={RectangleStencil}
                                src={selectedImage.url}
                                defaultSize={defaultSize}
                                style={transformSelectedEffectToMask(selectedStyleEffect)}
                            />
                        </Container>

                    </Col>

                    <Col>
                        <Container className="mb-4">
                            <Col className={"d-flex justify-content-center"}>
                                <h3>
                                    <Badge bg={"secondary"}>Артикул: {getSelectedImageName(selectedImage.name)}</Badge>
                                </h3>
                            </Col>
                            <WallpaperProperties {...propsForWallpaperProperties} />
                            <br/>


                            <hr/>
                            <Row>
                                <ButtonGroup size={"sm"}>
                                    <Button onClick={() => flip(true, false)} variant={'success'}>Отразить по
                                        горизонтали</Button>
                                    <Button onClick={() => flip(false, true)} variant={'success'}>Отразить по
                                        вертикали</Button>
                                </ButtonGroup>

                            </Row>
                            <p/>
                            <Row>

                                <StyleToolbar {...propsForStyleEffect} />
                                <Col className="d-flex justify-content-center">
                                    <Button onClick={handleSubmit} className="mt-4" variant={'success'}>
                                        Заказать
                                    </Button>
                                    <Alert show={selectedStyleEffect !== 0} variant="danger">Вы применили эффект.
                                        Рекомендуем заказать
                                        пробу</Alert>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <h1>Цена: <Badge bg={'secondary'}>{price} тенге</Badge></h1>
                            </Row>
                        </Container>
                    </Col>
                    {showOrderForm ? <OrderForm {...propsForOrderForm} /> : <></>}

                    <Row>

                    </Row>
                </Row>
            </Container>
        </motion.div>
    );
};

export default Editor;
