import React, {useState} from 'react';
import {CopyProps} from './Copy.props';
import styles from './Copy.module.scss';
import {Modal} from '../Modal/Modal';
import {P} from '../P/P';

export const Copy = ({text, variant, ...props}: CopyProps): JSX.Element => {

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <div
        className={variant === 'light' ? styles.copy2 : styles.copy}
        {...props}
        onClick={async () => {
          const queryOpts = {name: 'clipboard-read', allowWithoutGesture: false};
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const permissionStatus = await navigator.permissions.query(queryOpts);
          if (['prompt', 'granted'].includes(permissionStatus.state)) {
            await navigator.clipboard.writeText(String(text));
          } else {
            setIsModalShown(true);
          }
        }}
      />
      <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => setIsModalShown(false)}>
        <P size="s" weight="bold" style={{textAlign: 'center', wordWrap: 'break-word'}}>{text}</P>
      </Modal>
    </>
  );
};
