import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {nftCollectionAbi} from './deploySmartContract';
import {accountRegistryAbi} from './accountRegistryData';
import {MantleChain} from './wagmi';
import {accountContractAbi} from './accountContractData';


export const mintNFT = async (contractAddress: string, addressTo: string, itemId: bigint) => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(nftCollectionAbi as unknown as AbiItem, contractAddress);

  const backUrl = process.env.NEXT_PUBLIC_APP_URL;
  const uri = `${backUrl}/api/metaData/?collectionAddress=${contractAddress}&tokenId=${itemId}`;
  const mintResult = await contract.methods.mint(addressTo, itemId, uri).send({from: currentAccounts[0]});
  console.log(mintResult);
  return mintResult;
};


export interface IVerify {
  issueAddress: string,
  proxyAddress: string,
  tokenId: number,
  ownerOfAddress: string
}

export interface IReturnVerify {
  isOwner: boolean,
  isOwnerOf: boolean
}

export type CreateAccountInputType = {
  tokenCollection: string;
  tokenId: number | string | bigint;
}

export const createAccount = async ({tokenCollection, tokenId}: CreateAccountInputType) => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const accountRegistryAddress = process.env.NEXT_PUBLIC_ACCOUNT_REGISTRY_ADDRESS || '';
  const contract = new web3.eth.Contract(accountRegistryAbi as unknown as AbiItem, accountRegistryAddress);

  const createAccountResult = await contract.methods.createAccount(MantleChain.id, tokenCollection, tokenId).send({from: currentAccounts[0]});
  console.log(createAccountResult);
  return createAccountResult;
};

export const setExecutor = async (executor: string, accountAddress: string) => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(accountContractAbi as unknown as AbiItem, accountAddress);

  const setExecutorResult = await contract.methods.setExecutor(executor).send({from: currentAccounts[0], gas: 100_000});
  console.log(setExecutorResult);
  return setExecutorResult;
};

export const getExecutor = async () => {
  const web3 = new Web3(Web3.givenProvider);
  const currentAccounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(accountContractAbi as unknown as AbiItem, currentAccounts[0]);
  return await contract.methods.executor(currentAccounts[0]).call({from: currentAccounts[0]});
};
