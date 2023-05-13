import React, {ReactNode} from 'react';
import Image from 'next/image';
import {P, Card} from '../../components';
import styles from '../../styles/Login.module.scss';
import Metamask from '../../../public/assets/metamask.svg';
import {TOKEN} from '../../constants/localStorage';
import {useConnect} from 'wagmi';
import {useRouter} from 'next/router';
import {MetaMaskConnector} from '@wagmi/connectors/metaMask';
import {optimismGoerli} from 'wagmi/chains';

export default function LoginPage(): ReactNode {
  const router = useRouter();
  const con = new MetaMaskConnector({chains: [optimismGoerli]});
  const [loadMetamask, setLoadMetamask] = React.useState(false);
  const {connect} = useConnect({onSuccess: async data => {
    localStorage.setItem('account', data.account);
    await router.push('/collections');
  }, onError: error => {
    console.log('error', error.message);
    localStorage.removeItem('wallet');
    localStorage.removeItem('account');
    localStorage.removeItem(TOKEN);
    setLoadMetamask(false);
  }});

  const connectMetamaskWallet = async () => {
    setLoadMetamask(true);
    connect({connector: con});
  };


  return (
    <>
      {!loadMetamask && (
        <div className={styles.card}>
          <P size="l" weight="bold">Choose your wallet</P>
          <div className={styles.wallets}>
            <div className={styles.wallet_wrapper}>
              <div className={styles.wallet} onClick={() => connectMetamaskWallet()}>
                <p>Metamask</p>
                <Image src={Metamask} width={54} height={54}/>
              </div>
              <P size="s">Preferably if you are a representative or an individual delegator</P>
            </div>
          </div>
        </div>
      )}
      {loadMetamask &&
      <Card style={{marginTop: '40px', alignItems: 'center', padding: '60px 20px'}}>
        <P size="l" weight="bold">Connecting Metamask</P>
        <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
          <div className={styles.loader_icon}/>
        </div>
      </Card>
      }
    </>
  );
}

