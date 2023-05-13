export interface ICreateProxyGroupData {
  name: string,
  symbol: string,
  owner: string
}

export interface ICreateProxyGroupStorage extends ICreateProxyGroupData{
  setName: (name: string) => void;
  setSymbol: (symbol: string) => void;
  setOwner: (owner: string) => void;
  clear: () => void;
}

export interface IMintSBTData {
  collectionAddress: string,
  receiver: string,
  nickname: string,
  position: string,
  powers: string,
  telegram?: string,
  twitter?: string,
  discord?: string,
  expDate: Date,
}

export interface IMintSBTStorage extends IMintSBTData {
  setCollectionAddress: (collectionAddress: string) => void;
  setReceiver: (receiver: string) => void;
  setNickname: (nickname: string) => void;
  setPosition: (position: string) => void;
  setPowers: (powers: string) => void;
  setTelegram: (telegram: string) => void;
  setTwitter: (twitter: string) => void;
  setDiscord: (discord: string) => void;
  setExpDate: (expDate: Date) => void;
  clearMint: () => void;
}
