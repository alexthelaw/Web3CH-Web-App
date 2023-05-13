import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type UserCollection = {
    contractAddress: string,
    collectionName: string,
    collectionSymbol: string,
};


interface IUserCollectionsStore {
    userCollections: Array<UserCollection>;
    addUserCollection: (role: UserCollection) => void;
}

export const useUserCollectionsStore = create(persist<IUserCollectionsStore>((set) => ({
  userCollections: [],
  addUserCollection: (role) =>
    set((state) => ({
      ...state,
      useUserCollectionsStore: state.userCollections.push(role)
    }))
}), {name: 'USER_COLLECTIONS'}));
