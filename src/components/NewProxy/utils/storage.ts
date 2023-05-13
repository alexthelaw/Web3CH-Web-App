import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {ICreateProxyGroupStorage, IMintSBTStorage} from './interfaces';

export const useCreateProxyGroupStorage = create(
  persist<ICreateProxyGroupStorage>(
    (set) => ({
      name: '',
      symbol: '',
      owner: '',

      setName: (name: string) => {
        set((state) => ({
          name: state.name = name
        }));
      },

      setSymbol: (symbol: string) => {
        set((state) => ({
          symbol: state.symbol = symbol
        }));
      },

      setOwner: (owner: string) => {
        set((state) => ({
          owner: state.owner = owner
        }));
      },

      clear: () => {
        set((state) => ({
          name: state.name = '',
          symbol: state.symbol = '',
          owner: state.owner = ''
        }));
      }
    }),
    {
      name: 'CREATE_PROXY_GROUP_DATA'
    }
  ));

export const useMintSBTStorage = create(
  persist<IMintSBTStorage>(
    (set) => ({
      collectionAddress: '',
      receiver: '',
      nickname: '',
      position: '',
      powers: '',
      telegram: '',
      twitter: '',
      discord: '',
      expDate: new Date(),

      setCollectionAddress: (collectionAddress: string) => {
        set((state) => ({
          collectionAddress: state.collectionAddress = collectionAddress
        }));
      },

      setReceiver: (receiver: string) => {
        set((state) => ({
          receiver: state.receiver = receiver
        }));
      },

      setNickname: (nickname: string) => {
        set((state) => ({
          nickname: state.nickname = nickname
        }));
      },

      setPosition: (position: string) => {
        set((state) => ({
          position: state.position = position
        }));
      },

      setPowers: (powers: string) => {
        set((state) => ({
          powers: state.powers = powers
        }));
      },

      setTelegram: (telegram: string) => {
        set((state) => ({
          telegram: state.telegram = telegram
        }));
      },

      setTwitter: (twitter: string) => {
        set((state) => ({
          twitter: state.twitter = twitter
        }));
      },

      setDiscord: (discord: string) => {
        set((state) => ({
          discord: state.discord = discord
        }));
      },

      setExpDate: (expDate: Date) => {
        set((state) => ({
          expDate: state.expDate = expDate
        }));
      },

      clearMint: () => {
        set((state) => ({
          collectionAddress: state.collectionAddress = '',
          receiver: state.receiver = '',
          nickname: state.nickname = '',
          position: state.position = '',
          powers: state.powers = '',
          telegram: state.telegram = '',
          twitter: state.twitter = '',
          discord: state.discord = '',
          expDate: state.expDate = new Date()
        }));
      }
    }),
    {
      name: 'CREATE_PROXY_DATA'
    }
  ));
