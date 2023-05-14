import React, {ReactNode} from 'react';
import {Verifier} from '../../components/Verifier';
import {BackButton} from '../../components';
import {ProxyDetailsPage} from '../../components/NFTData';
import {useRouter} from 'next/router';

export default function VerifyPage(): ReactNode {
  const router = useRouter();

  return (
    <>
      <BackButton link="/"/>
      {router.query.address ? <ProxyDetailsPage accountAddress={router.query.address as string}/> : <Verifier/>}
    </>
  );
}

