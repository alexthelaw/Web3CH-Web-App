import React from 'react';
import {useUserCollectionsStore} from '../../store/userCollectionsStore';
import {Card} from '../Card/Card';
import styles from './OldCollections.module.scss';
import {useMintSBTStorage} from '../NewProxy/utils/storage';
export const OldCollections = () => {
  const {userCollections} = useUserCollectionsStore();
  const {setCollectionAddress, collectionAddress} = useMintSBTStorage();

  const onCardClick = (addr: string) => {
    return () => setCollectionAddress(addr);
  };

  return <div className={styles.wrapper}>{userCollections.map(c =>
    <Card key={c.contractAddress} onClick={onCardClick(c.contractAddress)} style={c.contractAddress === collectionAddress ? {border: '2px solid #FB8DA0'} : {border: '2px solid transparent', cursor: 'pointer'}}>
      <div className={styles.wrapper_inner}>
        <p>
          {c.collectionName}
        </p>
        <p>
          {c.collectionSymbol}
        </p>
        <a href={`https://explorer.testnet.mantle.xyz/address/${c.contractAddress}`} target={'_blank'} rel="noreferrer">
          {c.contractAddress}
        </a>
      </div>
    </Card>)}</div>;
};
