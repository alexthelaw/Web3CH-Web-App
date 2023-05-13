import React, {useState} from 'react';
import Image from 'next/image';
import styles from './Header.module.scss';
import Logo from '../../../public/assets/logo.png';
import {P} from '../P/P';
import ArrowDown from '../../../public/assets/arrow.svg';
import {redirect, startAndEnd} from '../../utils/misc';
import cn from 'classnames';
import Link from 'next/link';
import {useAccount} from 'wagmi';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const {address} = useAccount();

  const logOut = () => {
    localStorage.clear();
    redirect('/welcome');
  };

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
            <Image src={Logo} width={64} height={64}/>
            <P weight="bold" size="m" color="black">DAO Ambassador</P>
          </div>
        </a>
      </Link>
      {address && (
        <div className={cn(styles.user, {[styles.opened_menu]: isMenuOpen})} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={styles.avatar}>{<Image loader={() => `https://avatars.dicebear.com/api/adventurer-neutral/${address}.svg`} src={`https://avatars.dicebear.com/api/adventurer-neutral/${address}.svg`} width={46} height={46} layout="fixed"/>}</div>
          <p className={styles.username}>{startAndEnd(address, 6, 4)}</p>
          <div className={cn(styles.show_btn, {[styles.opened]: isMenuOpen})}>
            <Image src={ArrowDown.src} width={15} height={12} />
          </div>
        </div>
      )}
      {isMenuOpen &&
      <div className={styles.user_menu}>
        {/*<Link href="/account">*/}
        {/*  <a className={styles.gradient_text} onClick={() => setIsMenuOpen(false)}>*/}
        {/*    Manage my soul(s)*/}
        {/*  </a>*/}
        {/*</Link>*/}
        <P size="s" weight="bold" onClick={() => logOut()} style={{cursor: 'pointer'}}>Log out</P>
      </div>
      }
    </div>
  );
}
