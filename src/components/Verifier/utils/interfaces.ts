export interface IVerifyData {
  issueAddress: string,
  proxyAddress: string,
  tokenId: string,
  ownerOfAddress: string
}

export interface IVerifyStorage extends IVerifyData{
  setIssueAddress: (issueAddress: string) => void;
  setProxyAddress: (proxyAddress: string) => void;
  setTokenId: (tokenId: string) => void;
  setOwnerOfAddress: (ownerOfAddress: string) => void;
  clear: () => void;
}

