import React, {useState, useEffect} from "react";
import axios from "axios";
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import Uploader from './Uploader'
import WallpaperCard from "./WallpaperCard";
import WallpaperPagination from "./WallpaperPagination";
import LoadingScreen from "../../LoadingScreen";
import {motion} from "framer-motion";

import "./WallpaperCatalog.css";

const WallpaperCatalog = ({loading, setLoading, setSelectedImage}) => {
    const testImage = require("../../../Images/placeholder-image.webp");
    const mountainImage = require("../../../Images/editor_test.jpeg");
    const [images, setImages] = useState([
        {id: "0", name: "test", category: "test", url: testImage},
        {id: "0", name: "mountain", category: "nature", url: mountainImage},
    ]);

    // uploader modal state info
    const [showUploader, setShowUploader] = useState(false);
    const handleShowUploader = () => setShowUploader(true);
    const handleCloseUploader = () => setShowUploader(false);
    // add image handling to the state (uploader)
    // end of modal state info

    const [currentPage, setCurrentPage] = useState(1);
    const [totalImages, setTotalImages] = useState(0);
    const [imagesPerPage, setImagesPerPage] = useState(24);
    const api = "http://127.0.0.1:8000/api";

    // const lastImageIndex = imagesPerPage * currentPage;
    // const firstImageIndex = lastImageIndex - imagesPerPage;

    // This function is used for setting data from API
    /** Function to render test cards
     * @type {[Component]} WallpaperCard
     * @amount {int} how many cards to display
     * @returns an array of wallpaper cards
     */
    const [category, setCategory] = useState('0')
    const [categories, setCategories] = useState()
    const [search, setSearch] = useState("")
    const fetchImages = async () => {

        setLoading(true);
        const res = await axios.get(api + `/images/?p=${currentPage}
        ${category === '0' ? '' : `&category=` + `${category}`}
        ${search === "" ? '' : '&search=' + search}`,
            {
                // headers: {
                //   'category_id': '2'
                // }
            });
        setImages(res.data.results);
        setTotalImages(res.data.count)
        setLoading(false);
        console.log(images);
        console.log(`Current page: ${currentPage}`);
    };
    const fetchCategoriesFromApi = async () => {
        const response = await axios.get(api + "/categories/").catch((err) => {
            console.log(err);
        });
        setCategories(response.data)

    };

    useEffect((fetch = fetchImages) => {
        fetchImages().then(r => console.log("Fetch successful."));
        fetchCategoriesFromApi().then(r => console.log("Fetch successful."));
        document.title = 'Catalog';
    }, [currentPage, category, search]);
    console.log(categories)

    const renderWallpaperCards = (amount) => {
        const cards = [];
        Object.keys(images).map((key, item) => {

            cards.push(
                <Col className="d-flex justify-content-center mt-3">
                    <WallpaperCard key={item} id={key} setSelectedImage={setSelectedImage}
                                   imageObject={{...images[key]}}/>
                </Col>
            );
            if (parseInt(key) === images.length - 1) {
                console.log(`Logging images from ${images[images.length - 1].id - 24} to ${images[images.length - 1].id}`);
            }
            return 0;

        });
        return cards;
    };
    console.log(category)
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Container fluid="md" className="test">
                <Row>
                    <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                        <Row>
                            <Col>
                                {categories ? <Form.Select>
                                    <option value={0} onClick={(event) => setCategory(event.target.value)}>Рубрики
                                    </option>
                                    {Object.keys(categories).map((key, item) => {
                                        return (<option onClick={(event) => {setCategory(event.target.value); console.log("Picked category")}}
                                                        value={categories[key].id}>{categories[key].name}</option>)
                                    })}
                                </Form.Select> : <></>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control type="string"
                                              placeholder="Поиск"
                                              onChange={(event) => handleSearch(event)}
                                              value={search}
                                />
                            </Col>
                        </Row>

                </Col>
                <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                    <Button variant='success' onClick={handleShowUploader}>Загрузить изображение</Button>
                    <Uploader showUploader={showUploader} handleShowUploader={handleShowUploader}
                              handleCloseUploader={handleCloseUploader} setSelectedImage={setSelectedImage}/>
                </Col>
            </Row>

            <Row>

                <Col style={{border: "none"}} className="mt-4">
                    {loading ? (
                        <LoadingScreen status={0}/>
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
)
    ;
};

export default WallpaperCatalog;
