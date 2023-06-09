import React from 'react';
import {P} from '../P/P';
import {Card} from '../Card/Card';
import {Input} from '../Input/Input';
import {Button} from '../Button/Button';
import styles from '../../styles/Login.module.scss';
import {deployContract} from '../../utils/deploySmartContract';
import {useCreateProxyGroupStorage, useMintNFTStorage} from './utils/storage';
import {useUserCollectionsStore} from '../../store/userCollectionsStore';

export type ContractDeployResultType = 'deployed' | 'not-deployed' | null

// eslint-disable-next-line complexity
export const NewProxy = () => {

  const {name, symbol, setName, setSymbol, clear} = useCreateProxyGroupStorage();
  const {setCollectionAddress} = useMintNFTStorage();
  const {addUserCollection} = useUserCollectionsStore();


  const [load, setLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState({
    nameError: false,
    symbolError: false,
    addrError: false
  });
  const [contractDeployResult, setContractDeployResult] = React.useState<ContractDeployResultType>(null);
  const [contractAddressAfterDeploy, setContractAddressAfterDeploy] = React.useState<string>('');

  // eslint-disable-next-line complexity
  const createNewProxyGroup = async () => {
    setContractDeployResult(null);
    setContractAddressAfterDeploy('');
    if (!name) {
      setError({...error, nameError: true});
      return;
    }
    if (!symbol) {
      setError({...error, symbolError: true});
      return;
    }
    try {
      setLoad(true);
      const contract = await deployContract(name, symbol);
      if (contract) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        addUserCollection({contractAddress: contract._address, collectionName: name, collectionSymbol: symbol});
        setContractDeployResult('deployed');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setContractAddressAfterDeploy(contract._address);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCollectionAddress(contract._address);
        setLoad(false);
        clear();
      } else {
        // eslint-disable-next-line sonarjs/no-duplicate-string
        setContractDeployResult('not-deployed');
        setLoad(false);
      }
    } catch (e: any) {
      console.log(e);
      setContractDeployResult('not-deployed');
      setLoad(false);
    }

  };

  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
      <P size="l" weight="bold" style={{fontFamily: 'Panchang'}} color={'white'} className={styles.underline}>Step 1.</P>
      <P style={{width: '620px', marginTop: '18px'}} color={'white'}>
      Create an NFT collection of tokenized proxies for your DAO
      </P>
    </div>
    <Card style={load ? {marginTop: '40px', alignItems: 'center', padding: '60px 20px'} : {marginTop: '40px', gap: '18px'}}>
      {load
        ? <div className={styles.loader_wrapper}>
          <div className={styles.loader}/>
        </div>
        // eslint-disable-next-line sonarjs/no-duplicate-string
        : <><Input placeholder="Collection name" id={'group_name'} style={error.nameError ? {border: '2px solid red'} : undefined} onChange={e => {
          setError({...error, nameError: false});
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setName(e.target.value);
        }} value={name}/>
        <Input placeholder="Collection symbol" id={'group_symbol'} style={error.symbolError ? {border: '2px solid red'} : undefined} onChange={e => {
          setError({...error, symbolError: false});
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setSymbol(e.target.value);
        }} value={symbol}/>
        <div style={{width: '100%', margin: '50px 0 25px'}}>
          <Button size="l" onClick={() => createNewProxyGroup()} disabled={!name && !symbol}>Create collection</Button>
        </div></>
      }
      {contractDeployResult === 'deployed' &&
        <>
          <P style={{color: 'green', textAlign: 'center'}}>NFT collection was created successfully</P>
          <P style={{color: 'green', textAlign: 'center'}}>Your NFT collection address {contractAddressAfterDeploy}</P>
        </>
      }
      {contractDeployResult === 'not-deployed' && (<P style={{color: 'red', textAlign: 'center'}}>Something go wrong, please try again</P>)}
    </Card></>;
};
