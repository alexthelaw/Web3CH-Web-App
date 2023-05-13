import React from 'react';
import {TextareaProps} from './Textarea.props';
import styles from './Textarea.module.scss';

export const Textarea = ({placeholder = '', value = '', ...props}: TextareaProps): JSX.Element => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};
