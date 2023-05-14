import React, {useState} from 'react';
import {Button, Card, Input, P, Textarea, Loader, Modal} from '../../components';
import {createMetaData, randomNumber} from '../../utils/misc';
import {createAccount, mintNFT} from '../../utils/web3smarts';
import {ContractDeployResultType} from './index';
import {useMintNFTStorage} from './utils/storage';
import {useAccount} from 'wagmi';
import {useUserProxyStore} from '../../store/useProxiesStore';
import styles from '../../styles/Login.module.scss';

const errorStyle = {border: '2px solid red'};

// eslint-disable-next-line complexity
export const MintProxy = () => {

  const {collectionAddress,
    receiver,
    nickname,
    position,
    powers,
    telegram,
    twitter,
    discord,
    setNickname,
    setPosition,
    setPowers,
    setTelegram,
    setTwitter,
    setDiscord,
    clearMint} = useMintNFTStorage();

  const {addUserProxy} = useUserProxyStore();

  const [isModalShown, setIsModalShown] = useState(false);
  const [contractDeployResult, setContractDeployResult] = React.useState<ContractDeployResultType>(null);
  const [loadDeployment, setLoadDeployment] = useState<boolean>(false);

  const {address} = useAccount();

  const [error, setError] = React.useState({
    collectionAddressError: false,
    receiverError: false,
    nicknameError: false,
    positionError: false,
    powerError: false,
    socialsError: false
  });

  // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
  const mint = async () => {
    if (!collectionAddress) {
      setError({...error, collectionAddressError: true});
      return;
    }
    if (!nickname) {
      setError({...error, nicknameError: true});
      return;
    }
    if (!position) {
      setError({...error, positionError: true});
      return;
    }
    if (!powers) {
      setError({...error, powerError: true});
      return;
    }

    const metaData = createMetaData({
      agentNickname: nickname,
      positionName: position,
      powerDescription: powers,
      telegram,
      twitter,
      discord
    });

    try {
      setLoadDeployment(true);
      setIsModalShown(true);
      if (metaData) {
        const tokenId = BigInt(randomNumber());
        const response = await fetch('/api/metaData', {
          method: 'POST',
          body: JSON.stringify({...metaData, tokenId: tokenId.toString(), collectionAddress})
        });
        if (response.ok) {
          await mintNFT(collectionAddress, address as string, tokenId);
          const createAccountData = await createAccount({tokenCollection: collectionAddress, tokenId});
          if (createAccountData) {
            addUserProxy({
              contractAddress: createAccountData.events.AccountCreated.returnValues.account,
              collectionAddress,
              collectionName: '',
              collectionSymbol: '',
              tokenId: tokenId.toString(),
              executor: receiver
            });
            setLoadDeployment(false);
            setContractDeployResult('deployed');
            clearMint();
          } else {
            setLoadDeployment(false);
            // eslint-disable-next-line sonarjs/no-duplicate-string
            setContractDeployResult('not-deployed');
          }
        }
      } else {
        setLoadDeployment(false);
        // eslint-disable-next-line sonarjs/no-duplicate-string
        setContractDeployResult('not-deployed');
      }
    } catch (e: any) {
      console.log(e);
      setLoadDeployment(false);
      setContractDeployResult('not-deployed');
    }
  };

  const closeModal = () => {
    setLoadDeployment(false);
    setContractDeployResult(null);
    setIsModalShown(false);
  };


  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '50%'}}>
      <P size="l" weight="bold" style={{fontFamily: 'Panchang'}} color={'white'} className={styles.underline}>Step 2. </P>
      <P color={'white'}>Create New Proxy</P>
    </div>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <Input placeholder="Trustee's name" id={'nickname_id'} onChange={(e) => {
        setError({...error, nicknameError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setNickname(e.target.value);
      }} style={error.nicknameError ? errorStyle : undefined} value={nickname}/>
      <Input placeholder="Trustee's role" id={'position_name_id'} onChange={(e) => {
        setError({...error, positionError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPosition(e.target.value);
      }} style={error.positionError ? errorStyle : undefined} value={position}/>
      <Textarea placeholder="Describe Trustee powers in DA" id={'powers_id'} onChange={(e) => {
        setError({...error, powerError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPowers(e.target.value);
      }} style={error.powerError ? errorStyle : undefined} value={powers}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Trustee&apos;s contacts</P>
      {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">1. Telegram</P>
        <div style={{width: '70%'}}>
          <Input placeholder="" id={'telegram_id'} onChange={(e) => {
            setError({...error, socialsError: false});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setTelegram(e.target.value);
          }} style={error.socialsError ? errorStyle : undefined} value={telegram}/>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">2. Twitter</P>
        <div style={{width: '70%'}}>
          <Input placeholder="" id={'twitter_id'} onChange={(e) => {
            setError({...error, socialsError: false});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setTwitter(e.target.value);
          }} style={error.socialsError ? errorStyle : undefined} value={twitter}/>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px'}}>
        <P weight="bold">3. Discord</P>
        <div style={{width: '70%'}}>
          <Input placeholder="" id={'discord_id'} onChange={(e) => {
            setError({...error, socialsError: false});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setDiscord(e.target.value);
          }} style={error.socialsError ? errorStyle : undefined} value={discord}/>
        </div>
      </div>
      <Button size="l" style={{marginTop: '40px'}} onClick={mint} disabled={!nickname || !position || !powers}>Create proxy</Button>
    </Card>
    <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => closeModal()}>
      {loadDeployment
        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexDirection: 'column'}}>
          <Loader/>
          <P size="s" style={{textAlign: 'center'}}>Please don&apos;t close the page</P>
        </div>
        : <>
          {contractDeployResult === 'deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'green'}}>NFT was minted successfully</P></>
          )}
          {contractDeployResult === 'not-deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'red'}}>Something go wrong, please try again</P></>
          )}
        </>
      }
    </Modal></>;
};
