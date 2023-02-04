import { useEffect, useCallback } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ closeModal, currentImage: { alt, src } }) => {
  const closeLargeImg = useCallback(
    ({ code, target, currentTarget }) => {
      if (target === currentTarget || code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeLargeImg);

    return () => document.removeEventListener('keydown', closeLargeImg);
  }, [closeLargeImg]);

  return (
    <div className={css.overlay} onClick={closeLargeImg}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  currentImage: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
