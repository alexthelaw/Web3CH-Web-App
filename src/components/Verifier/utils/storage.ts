import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {IVerifyStorage} from './interfaces';

export const useVerifyStorage = create(
  persist<IVerifyStorage>(
    (set) => ({
      issueAddress: '',
      proxyAddress: '',
      tokenId: '',
      ownerOfAddress: '',

      setIssueAddress: (issueAddress: string) => {
        set((state) => ({
          issueAddress: state.issueAddress = issueAddress
        }));
      },

      setProxyAddress: (proxyAddress: string) => {
        set((state) => ({
          proxyAddress: state.proxyAddress = proxyAddress
        }));
      },

      setTokenId: (tokenId: string) => {
        set((state) => ({
          tokenId: state.tokenId = tokenId
        }));
      },

      setOwnerOfAddress: (ownerOfAddress: string) => {
        set((state) => ({
          ownerOfAddress: state.ownerOfAddress = ownerOfAddress
        }));
      },

      clear: () => {
        set((state) => ({
          issueAddress: state.issueAddress = '',
          proxyAddress: state.proxyAddress = '',
          tokenId: state.tokenId = '',
          ownerOfAddress: state.ownerOfAddress = ''
        }));
      }
    }),
    {
      name: 'VERIFY_DATA'
    }
  ));

