import React, {FC, useEffect, useState} from 'react';
import styles from '../../styles/ProxyDetails.module.scss';
import {BackButton, Button, Copy, Loader, P} from '../index';
import {startAndEnd} from '../../utils/misc';
import {useBalance, useContractRead, useContractReads} from 'wagmi';
import {accountContractAbi} from '../../utils/accountContractData';
import {Response} from '../../pages/api/metaData';
import {nftCollectionAbi} from '../../utils/deploySmartContract';

export const ProxyDetailsPage: FC<{accountAddress: string}> = ({accountAddress}) => {

  const accountContract = {
    address: accountAddress,
    abi: accountContractAbi
  };

  const {data} = useContractReads({
    contracts: [
      {
        ...accountContract,
        functionName: 'token'
      } as any,
      {
        ...accountContract,
        functionName: 'owner'
      } as any,
      {
        ...accountContract,
        functionName: 'getExecutor'
      } as any
    ],
    onSuccess: data1 => console.log(data1)
  });


  const [metaData, setMetaData] = useState<Response>({
    tokenId: '0',
    collectionAddress: '0',
    agentNickname: '',
    positionName: '',
    powerDescription: '',
    socialAccounts: {
      telegram: '',
      twitter: '',
      discord: ''
    }
  });
  const {refetch, data: collectionData} = useContractRead({
    address: metaData.collectionAddress as `0x${string}`,
    abi: nftCollectionAbi,
    functionName: 'name'
  });


  useEffect(() => {
    const tokenData = data?.[0];
    if (tokenData?.result && Array.isArray(tokenData?.result)) {
      fetch(`api/metaData/?collectionAddress=${tokenData.result[1]}&tokenId=${tokenData.result[2]}`, {
        method: 'GET'
      }).then(data1 => data1.json().then(data2 => {
        if (data2) {
          setMetaData(data2 as Response);
        } else {
          setMetaData({
            tokenId: String(tokenData.result[2]),
            collectionAddress: String(tokenData.result[1]),
            agentNickname: '',
            positionName: '',
            powerDescription: '',
            socialAccounts: {
              telegram: '',
              twitter: '',
              discord: ''
            }
          });
        }
      }));
    } else {
      setMetaData({
        tokenId: String(tokenData?.result?.[2]),
        collectionAddress: String(tokenData?.result?.[1]),
        agentNickname: '',
        positionName: '',
        powerDescription: '',
        socialAccounts: {
          telegram: '',
          twitter: '',
          discord: ''
        }
      });
    }
  }, [data]);

  const {data: accountBalance} = useBalance({
    address: accountAddress as `0x${string}`,
    formatUnits: 'ether'
  });

  useEffect(() => {
    if (metaData.collectionAddress && metaData.collectionAddress !== '0') {
      (async () => await refetch())();
    }
  }, [metaData]);


  return (
    <>
      <BackButton link="/"/>
      {data
        ? <>
          <P size="l" weight="bold" style={{marginBottom: '15px', fontFamily: 'Panchang'}} color={'white'}>Proxy ID: {startAndEnd(String(data?.[0]?.result?.[2]), 5, 5)}<Copy text={String(data?.[0]?.result?.[2]) as string} style={{marginLeft: '10px'}}/></P>
          <P weight="bold" color={'white'}>Issued by: {startAndEnd(String(data?.[1]?.result), 5, 3)}<Copy text={String(data?.[1]?.result)} style={{marginLeft: '10px', verticalAlign: '-2px'}}/></P>
          <div className={styles.proxy_card}>
            <div className={styles.top}>
              {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                  <P size="l" weight="bold" color="white">{metaData.agentNickname}</P>
                  <P size="sm" color="white" style={{display: 'flex', alignItems: 'center', height: '10%'}}>Trustee address: {startAndEnd(String(data?.[2]?.result), 4, 4)}<Copy text={String(data?.[2]?.result)} style={{marginLeft: '10px', verticalAlign: '-2px'}}/></P>
                </div>
                <div style={{width: 'fit-content'}}>
                  <P className={styles.role_label}>Role</P>
                  <p className={styles.role}>{metaData.positionName}</p>
                </div>
                <P size="l" weight="bold" color="white" style={{display: 'flex', alignItems: 'center'}}><>{collectionData}<Copy text={metaData.collectionAddress} style={{marginLeft: '10px', verticalAlign: '-2px'}}/></></P>
              </div>
            </div>
            <div className={styles.bottom}>
              <div>
                <P size="sm" weight="bold">Role description</P>
                <P style={{marginTop: '18px'}}>{metaData.powerDescription}</P>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <P size="sm" weight="bold">Telegram</P>
                  <P style={{marginTop: '18px'}}>{metaData.socialAccounts.telegram}</P>
                </div>
                <div>
                  <P size="sm" weight="bold">Twitter</P>
                  <P style={{marginTop: '18px'}}>{metaData.socialAccounts.twitter}</P>
                </div>
                <div>
                  <P size="sm" weight="bold">Discord</P>
                  <P style={{marginTop: '18px'}}>{metaData.socialAccounts.discord}</P>
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  <P size="sm" weight="bold">Proxy Account</P>
                  <P style={{marginTop: '18px'}}>{startAndEnd(accountAddress, 4, 4)}<Copy text={accountAddress} style={{marginLeft: '10px', verticalAlign: '-2px'}} variant={'light'}/></P>
                </div>
                <div>
                  <P size="sm" weight="bold">Proxy Balance</P>
                  <P style={{marginTop: '18px'}}>{accountBalance?.formatted} {accountBalance?.symbol}</P>
                </div>
              </div>
              <Button onClick={() => navigator.clipboard.writeText(window.location.href)} style={{margin: '10px auto 0'}}>Copy link</Button>
            </div>
          </div>
        </>
        : <Loader/>
      }
    </>
  );
};
