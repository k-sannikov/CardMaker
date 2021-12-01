import { Context, createContext } from 'react';
import { Store } from 'redux';

const StoreContext: Context<Store> = createContext({} as Store);

export default StoreContext;