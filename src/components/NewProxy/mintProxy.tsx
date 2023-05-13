import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button, Card, Input, P, Textarea, Loader, Modal} from '../../components';
import {createMetaData, randomNumber} from '../../utils/misc';
import {useValueStorage} from '../Select/valueStorage';
import {createAccount, mintNFT, mintSbt, setExecutor} from '../../utils/web3smarts';
import {ContractDeployResultType} from './index';
import {useMintSBTStorage} from './utils/storage';
import {useAccount} from 'wagmi';

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
    setCollectionAddress,
    setReceiver,
    setNickname,
    setPosition,
    setPowers,
    setTelegram,
    setTwitter,
    setDiscord,
    clearMint} = useMintSBTStorage();

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
  const router = useRouter();

  // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
  const mint = async () => {
    if (!collectionAddress) {
      setError({...error, collectionAddressError: true});
      return;
    }
    if (!receiver) {
      setError({...error, receiverError: true});
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
    if (!telegram && !twitter && !discord) {
      setError({...error, socialsError: true});
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
          const setExecutorResult = await setExecutor(receiver, createAccountData.events.AccountCreated.returnValues.account);
          console.log(setExecutorResult);
          if (setExecutorResult) {
            setLoadDeployment(false);
            setContractDeployResult('deployed');
            clearMint();
            await router.push('/collections');
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


  return <><P size="l" weight="bold" style={{marginTop: '40px'}}>Create New Proxy</P>
    <Card style={{marginTop: '40px', gap: '18px'}}>
      <P size="sm" weight="bold">Proxy Group</P>
      <Input placeholder="Proxy Group Address" id={'collection_address_id'} onChange={(e) => {
        setError({...error, collectionAddressError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCollectionAddress(e.target.value);
      }} style={error.collectionAddressError ? errorStyle : undefined} value={collectionAddress}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Identify the Agent</P>
      <Input placeholder="Agent Soul Address" id={'receiver_address_id'} onChange={(e) => {
        setError({...error, receiverError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setReceiver(e.target.value);
      }} style={error.receiverError ? errorStyle : undefined} value={receiver}/>
      <Input placeholder="Agent Nickname" id={'nickname_id'} onChange={(e) => {
        setError({...error, nicknameError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setNickname(e.target.value);
      }} style={error.nicknameError ? errorStyle : undefined} value={nickname}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Describe his role in DAO</P>
      <Input placeholder="Position name" id={'position_name_id'} onChange={(e) => {
        setError({...error, positionError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPosition(e.target.value);
      }} style={error.positionError ? errorStyle : undefined} value={position}/>
      <Textarea placeholder="Powers Description" id={'powers_id'} onChange={(e) => {
        setError({...error, powerError: false});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setPowers(e.target.value);
      }} style={error.powerError ? errorStyle : undefined} value={powers}/>
      <P size="sm" weight="bold" style={{marginTop: '20px'}}>Provide Agent’s public contacts</P>
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
      <Button size="l" style={{marginTop: '40px'}} onClick={() => mint()}>Create proxy</Button>
    </Card>
    <Modal modalTitle="Verification result" isShown={isModalShown} hide={() => closeModal()}>
      {loadDeployment
        ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', flexDirection: 'column'}}>
          <Loader/>
          <P size="s" style={{textAlign: 'center'}}>Please don&apos;t close the page</P>
        </div>
        : <>
          {contractDeployResult === 'deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'green'}}>SBT was minted successfully</P></>
          )}
          {contractDeployResult === 'not-deployed' && (
            <><P size="l" style={{textAlign: 'center', color: 'red'}}>Something go wrong, please try again</P></>
          )}
        </>
      }
    </Modal></>;
};
