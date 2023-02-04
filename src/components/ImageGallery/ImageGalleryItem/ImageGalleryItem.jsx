import css from './image-gallery-item.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImage, largeImage, tags, openModal }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={smallImage}
        alt={tags}
        onClick={() => openModal({ alt: tags, src: largeImage })}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
