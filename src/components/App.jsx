import { useState, useEffect } from 'react';
import { getImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isImagesShow, setIsImagesShow] = useState(false);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getImages(search, page);
        setImages(prevImages => [...prevImages, ...data]);
        setIsImagesShow(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page, setLoading, setImages, setIsImagesShow]);

  const onGetImages = ({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={onGetImages} />
      {isImagesShow && <ImageGallery images={images} openModal={openModal} />}
      {loading && <Loader />}
      {isImagesShow && !loading && (
        <Button text="Load more..." handleClick={loadMore} />
      )}
      {currentImage && (
        <Modal currentImage={currentImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
