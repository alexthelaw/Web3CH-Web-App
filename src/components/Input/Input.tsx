import React from 'react';
import {InputProps} from './Input.props';
import styles from './Input.module.scss';

export const Input = ({placeholder = '', value = '', ...props}: InputProps): JSX.Element => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};
