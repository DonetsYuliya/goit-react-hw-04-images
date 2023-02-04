import { Component } from 'react';
import { getImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    loading: false,
    currentImage: null,
    isImagesShow: false,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await getImages(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...data],
        isImagesShow: true,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  getImages = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = data => {
    this.setState(prevState => {
      return { currentImage: data };
    });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { images, loading, currentImage, isImagesShow } = this.state;
    const { getImages, loadMore, openModal, closeModal } = this;
    return (
      <div>
        <Searchbar onSubmit={getImages} />
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
  }
}
