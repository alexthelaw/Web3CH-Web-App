import React from 'react';
import {Header} from '../components';
import styles from './MainLayout.module.scss';
import {useRouter} from 'next/router';

type Props = {
    children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({children}) => {
  const {pathname} = useRouter();
  return (
    <div className={styles.wrapper}>
      {pathname === '/' && <div className={styles.wrapper_login}/>}
      <Header/>
      <div className={styles.main}>
        {pathname === '/' && <div className={styles.form_bg}/>}
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
