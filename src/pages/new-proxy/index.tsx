import React, {ReactNode, useState} from 'react';

import {NewProxy} from '../../components/NewProxy';
import {MintProxy} from '../../components/NewProxy/mintProxy';
import {BackButton} from '../../components';
import {OldCollections} from '../../components/OldCollections';

export default function NewProxyPage(): ReactNode {


  return (
    <>
      <BackButton link="/collections"/>
      <SwitchNewOrOld/>
      <MintProxy/>
    </>
  );
}

const SwitchNewOrOld = () => {
  const [switchView, setSwitchView] = useState<boolean>(false);

  const change = () => {
    setSwitchView(!switchView);
  };

  return <>
    <button onClick={change}>Switch</button>
    {
      switchView ? <OldCollections/> : <NewProxy/>
    }
  </>;
};

