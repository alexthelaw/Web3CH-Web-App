import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type UserProxy = {
    contractAddress: string,
    collectionAddress: string,
    collectionName: string,
    collectionSymbol: string,
    tokenId: string,
    executor: string
};


interface IUserProxiesStore {
    userProxies: Array<UserProxy>;
    addUserProxy: (proxy: UserProxy) => void;
}

export const useUserProxyStore = create(persist<IUserProxiesStore>((set) => ({
  userProxies: [],
  addUserProxy: (role) =>
    set((state) => ({
      ...state,
      userProxies: state.userProxies.push(role)
    }))
}), {name: 'USER_PROXIES'}));
