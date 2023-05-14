import React from 'react';
import {Button, Card, Input, P} from '../../components';
import {useVerifyStorage} from './utils/storage';
import styles from '../../styles/Login.module.scss';
import {useRouter} from 'next/router';

const errorStyle = {border: '2px solid red'};

export const Verifier = () => {

  const {issueAddress, setIssueAddress} = useVerifyStorage();
  const {push} = useRouter();

  const [error, setError] = React.useState({
    issueAddressError: false
  });

  const verifyOnClick = async () => {
    if (!issueAddress) {
      setError({...error, issueAddressError: true});
      return;
    }
    await push(`/verify?address=${issueAddress}`);
  };

  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '50%', gap: '10px'}}>
      <P size="l" weight="bold" style={{fontFamily: 'Panchang'}} color={'white'} className={styles.underline}>Verify</P>
      <P color={'white'} style={{maxWidth: '400px'}}>Here you can verify a transaction made by a Trustee. Enter the Proxy account address here</P>
    </div>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <Input placeholder="Issuer Address" id={'issueAddress'} style={error.issueAddressError ? errorStyle : undefined} onChange={(e) => {
        setError({...error, issueAddressError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setIssueAddress(e.target.value);
      }} value={issueAddress}/>
      <Button size="l" onClick={verifyOnClick}>Verify</Button>
    </Card>
  </>;
};
