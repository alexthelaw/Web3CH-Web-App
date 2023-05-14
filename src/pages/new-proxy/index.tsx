import React, {ReactNode} from 'react';

import {NewProxy} from '../../components/NewProxy';
import {MintProxy} from '../../components/NewProxy/mintProxy';
import {BackButton} from '../../components';
import {useUserCollectionsStore} from '../../store/userCollectionsStore';
import {useUserProxyStore} from '../../store/useProxiesStore';
import {SetExecutor} from '../../components/SetExecutor';

export default function NewProxyPage(): ReactNode {

  const {userCollections} = useUserCollectionsStore();
  const {userProxies} = useUserProxyStore();

  return (
    <>
      {userCollections.length === 0
        ? <>
          <BackButton link="/"/>
          <NewProxy/>
        </>
        : <>{userProxies.length === 0 ? <MintProxy/> : <SetExecutor/>}</>
      }
    </>
  );
}

