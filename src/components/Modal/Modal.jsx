import { Component } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeLargeImg);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeLargeImg);
  }

  closeLargeImg = ({ code, target, currentTarget }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeLargeImg } = this;
    const {
      currentImage: { alt, src },
    } = this.props;
    return (
      <div className={css.overlay} onClick={closeLargeImg}>
        <div className={css.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  currentImage: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};
