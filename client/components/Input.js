import styles from 'components/Inputs.scss';

import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import cx from 'classnames';

function debounce(func, wait, immediate = false) {
  let timeout;
  return function debounced() {
    const context = this;
    const args = arguments; // eslint-disable-line prefer-rest-params

    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const INPUT_TYPES = [
  'text', 'password', 'hidden',
  'checkbox',   'button', 'email',
  'file',    'image', 'search',
  'tel',     'time', 'url',
  'week', 'select'
]


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    const debounceTimeout = 500;
    this.createNotifier(debounceTimeout);
  }

  createNotifier(debounceTimeout) {
    this.notify = debounce(this.props.onChange, debounceTimeout);
  }

  _onChange(e) {
    e.persist();

    const value = e.target.value;

    this.setState({ value: value });

    this.notify(e);
  }

  render() {
    const { defaultValue, value, minLength, maxLength, size, type, placeholder, width, name, id, style, classNames, errorMessage, hasError, hidden, required } = this.props // eslint-disable-line max-len,no-unused-vars
    
    return (
      <div styleName="input-container">
        <label
          className="input-label"
          htmlFor={id}
          dangerouslySetInnerHTML={{__html: this.props.labelText}}
        ></label>
        <input
          defaultValue={defaultValue || value}
          id={id}
          style={style}
          type={type}
          style={{display: (hidden || type === 'hidden') ? 'none' : 'block'}}
          placeholder={placeholder}
          name={name}
          required={required}
          onChange={this._onChange}
          maxLength={maxLength}
          minLength={minLength}
          className={cx({
            [`input-${width}-width`]: true,
            [`input-${size}`]: true
          }, classNames)}
        >
        </input>
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(INPUT_TYPES),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  width: PropTypes.oneOf(['half', 'full']),
  classNames: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  hidden: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  size: 'default',
  required: false,
  defaultValue: '',
  value: '',
  hidden: false,
  classNames: '',
  onChange: function () {} // eslint-disable-line func-names
}

export default CSSModules(Input, styles);
