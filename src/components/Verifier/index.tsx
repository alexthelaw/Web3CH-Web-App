import React, {useState} from 'react';
import {Button, Card, Input, Loader, Modal, P} from '../../components';
import {verify} from '../../utils/web3smarts';
import {useVerifyStorage} from './utils/storage';

const errorStyle = {border: '2px solid red'};

export const Verifier = () => {

  const {issueAddress, setIssueAddress, proxyAddress, setProxyAddress, tokenId, setTokenId, ownerOfAddress, setOwnerOfAddress} = useVerifyStorage();

  const [isModalShown, setIsModalShown] = useState(false);
  const [load, setLoad] = useState(false);
  const [modalDetails, setModalDetails] = useState<boolean>(false);

  const [error, setError] = React.useState({
    issueAddressError: false,
    proxyAddressError: false,
    tokenIdError: false,
    ownerOfAddressError: false
  });

  const verifyOnClick = async () => {
    if (!issueAddress) {
      setError({...error, issueAddressError: true});
      return;
    }
    if (!proxyAddress) {
      setError({...error, proxyAddressError: true});
      return;
    }
    if (!Number(tokenId)) {
      setError({...error, tokenIdError: true});
      return;
    }
    if (!ownerOfAddress) {
      setError({...error, ownerOfAddressError: true});
      return;
    }
    setLoad(true);
    setIsModalShown(true);
    const result = await verify({
      issueAddress: issueAddress,
      proxyAddress: proxyAddress,
      tokenId: Number(tokenId),
      ownerOfAddress: ownerOfAddress
    });
    setModalDetails(result.isOwner && result.isOwnerOf);
    setLoad(false);
  };

  return <>
    <P size="l" weight="bold">Verify the Proxy</P>
    <P>Verify Proxy ownership and ensure it’s not expired</P>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <P size="sm" weight="bold">Identify the Proxy</P>
      <Input placeholder="Issuer Address" id={'issueAddress'} style={error.issueAddressError ? errorStyle : undefined} onChange={(e) => {
        setError({...error, issueAddressError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setIssueAddress(e.target.value);
      }} value={issueAddress}/>
      <Input placeholder="Proxy Group" id={'proxyAddress'} style={error.proxyAddressError ? errorStyle : undefined} onChange={(e) => {
        setError({...error, proxyAddressError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setProxyAddress(e.target.value);
      }} value={proxyAddress}/>
      <Input placeholder="Proxy ID" id={'tokenId'} style={error.tokenIdError ? errorStyle : undefined} onChange={(e) => {
        setError({...error, tokenIdError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setTokenId(e.target.value);
      }} value={tokenId}/>
      <P size="sm" weight="bold">Identify the Ambassador </P>
      <Input placeholder="Ambassador’s Soul" id={'ownerOfAddress'} style={error.ownerOfAddressError ? errorStyle : undefined} onChange={(e) => {
        setError({...error, ownerOfAddressError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setOwnerOfAddress(e.target.value);
      }} value={ownerOfAddress}/>
      <Button size="l" style={{marginTop: '40px'}} onClick={verifyOnClick}>Verify</Button>
    </Card>
    <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => setIsModalShown(false)} isNotProxyOwner={modalDetails} notExpired={modalDetails}>
      {load && (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <Loader/>
        </div>
      )}
    </Modal>
  </>;
};
