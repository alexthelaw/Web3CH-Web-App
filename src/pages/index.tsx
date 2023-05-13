import React, {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Loader} from '../components';
import {useAccount} from 'wagmi';

export default function IndexPage(): ReactNode {
  const router = useRouter();
  const {address} = useAccount();

  useEffect(() => {
    if (address) {
      router.push('/collections');
    } else {
      router.push('/welcome');
    }
  }, [address]);

  return <Loader/>;
}

