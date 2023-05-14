import React, {ReactNode, useCallback} from 'react';
import {useRouter} from 'next/router';
import {Button, Loader, P} from '../components';
import {useAccount, useConnect} from 'wagmi';
import {MetaMaskConnector} from '@wagmi/connectors/metaMask';
import {MantleChain} from '../utils/wagmi';
import styles from '../styles/MainPage.module.scss';
import Image from 'next/image';
import LogoColor from '../../public/assets/logo_color.png';

export default function IndexPage(): ReactNode {
  const router = useRouter();
  const {address, isConnected, isConnecting} = useAccount();
  const {connect} = useConnect({onSuccess: async () => router.push('/new-proxy')});
  const connector = new MetaMaskConnector({chains: [MantleChain]});

  const goToVerify = async () => {
    await router.push('/verify');
  };

  const connectClick = useCallback(async () => {
    if (address && isConnected) {
      await router.push('/new-proxy');
    } else {
      await connect({connector});
    }
  }, [address, isConnected]);

  return (
    <>
      {
        isConnecting
          ? <Loader/>
          : <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginTop: '12%', zIndex: 2, width: '100%', height: '100%', gap: '30px'}}>
            <Image src={LogoColor}/>
            <div className={styles.wrapper}>
              <P color={'white'} style={{fontFamily: 'Panchang', fontSize: '50px'}}>
              Web3ch
              </P>
              <div>
                <P size={'m'} color={'white'} style={{maxWidth: '430px', textAlign: 'center'}}>
              NFT-Powered Delegation.
                </P>
                <P size={'m'} color={'white'} style={{maxWidth: '430px', textAlign: 'center'}}>
              Streamline Your DAO Fund Management with ERC-6551 Tokens
                </P>
              </div>
              <div className={styles.btns}>
                <Button view={'white'} onClick={connectClick}>DELEGATE POWERS</Button>
                <Button view={'white'} onClick={goToVerify}>VERIFY POWERS</Button>
              </div>
            </div>
          </div>
      }
    </>
  );
}

