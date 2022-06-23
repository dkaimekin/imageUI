import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Offcanvas, Button } from "react-bootstrap";

import WallpaperCard from "./WallpaperCard";
import WallpaperPagination from "./WallpaperPagination";
import LoadingScreen from "../../LoadingScreen";
import { motion } from "framer-motion";

import "./WallpaperCatalog.css";

const WallpaperCatalog = ({ loading, setLoading, setSelectedImage }) => {
  const [images, setImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(24);
  const api = "http://localhost:8000/api/images";

  const lastImageIndex = imagesPerPage * currentPage;
  const firstImageIndex = lastImageIndex - imagesPerPage;

  // This function is used for setting data from API
  useEffect(() => {
    /**
     * Function to get test data from jsonplaceholder
     */
    const fetchImages = async () => {
      console.log("Fetching...");
      setLoading(true);

      const getTotalImages = await axios.get(api);
      setTotalImages(getTotalImages.data.count);

      const res = await axios.get(api + `/?p=${currentPage}`);
      setImages(res.data.results);

      setLoading(false);

      console.log(`Current page: ${currentPage}`);
    };

    fetchImages();
  }, [currentPage]);

  /** Function to render test cards
   * @type {[Component]} WallpaperCard
   * @amount {int} how many cards to display
   * @returns an array of wallpaper cards
   */
  const renderWallpaperCards = (amount) => {
    const cards = [];
    Object.keys(images).map((key, item) => {
      cards.push(
        <Col className="d-flex justify-content-center mt-3">
          <WallpaperCard key={item} id={key} setSelectedImage={setSelectedImage} imageObject={{ ...images[key] }} />
        </Col>
      );

      if (parseInt(key) === images.length - 1) {
        console.log(`Logging images from ${images[images.length - 1].id - 24} to ${images[images.length - 1].id}`);
      }
      return 0;
    });

    return cards;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container fluid="md" className="test">
        <Row>
          <Col style={{ border: "2px dashed black" }} className="mt-4">
            {loading ? (
              <LoadingScreen status={0} />
            ) : (
              <Row className="justify-content-center">{renderWallpaperCards(imagesPerPage)}</Row>
            )}
          </Col>
        </Row>
        <WallpaperPagination
          totalImages={totalImages}
          imagesPerPage={imagesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </motion.div>
  );
};

export default WallpaperCatalog;
