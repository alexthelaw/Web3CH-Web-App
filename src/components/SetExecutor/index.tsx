import React, {ChangeEvent, useState} from 'react';
import {P} from '../P/P';
import {Card} from '../Card/Card';
import styles from '../../styles/Login.module.scss';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import {useUserProxyStore} from '../../store/useProxiesStore';
import {setExecutor} from '../../utils/web3smarts';
import {useRouter} from 'next/router';

export const SetExecutor = () => {

  const router = useRouter();
  const {userProxies} = useUserProxyStore();

  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [executorInput, setExecutorInput] = useState<string>('');

  const setExecutorClick = async () => {
    try {
      setLoad(true);
      await setExecutor(executorInput, userProxies[0].contractAddress);
      localStorage.removeItem('USER_PROXIES');
      localStorage.removeItem('CREATE_PROXY_DATA');
      localStorage.removeItem('USER_COLLECTIONS');
      await router.push(`/verify?address=${userProxies[0].contractAddress}`);
    } catch (e) {
      setLoad(false);
      setError(true);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }
    setExecutorInput(e.target.value);
  };

  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
      <P size="l" weight="bold" style={{fontFamily: 'Panchang'}} color={'white'} className={styles.underline}>Step 3.</P>
      <P style={{width: '620px', marginTop: '18px'}} color={'white'}>
        Specify the Trustee&apos;s address
      </P>
    </div>
    <Card style={load ? {marginTop: '40px', alignItems: 'center', padding: '60px 20px'} : {marginTop: '40px', gap: '18px'}}>
      {load
        ? <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
        </div>
        : <><Input placeholder="Trustee's address" id={'group_name'} value={executorInput} onChange={onChange}/>
          <div style={{width: '100%', margin: '10px 0 25px'}}>
            <Button size="l" onClick={setExecutorClick} disabled={!executorInput}>FINISH</Button>
          </div></>
      }
      {error && (<P style={{color: 'red', textAlign: 'center'}}>Something go wrong, please try again</P>)}
    </Card></>;
};
