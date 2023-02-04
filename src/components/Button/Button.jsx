import css from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, handleClick }) => {
  return (
    <button className={css.button} type="button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;

Button.propTyes = {
  test: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};
