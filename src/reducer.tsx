import { createSlice } from '@reduxjs/toolkit';
import networks from './config/networks.json'

const locales = {
    "en-US": require('./locales/en-US.json'),
    "zh-CN": require('./locales/zh-CN.json'),
};

const lang = window.localStorage.getItem('lang') || 'en-US';
export const DEFAULT_NET = 'ETH'

const AppKey = process.env.REACT_APP_GTAG || ''
// const chainIds = {};
// Object.keys(networks).map(k=>chainIds[networks[k].chainId] = k);

// const initial:WalletTypes = {
// 	// chainIds,
// 	// chainId:networks[DEFAULT_NET].chainId,
//     // rpc:networks[DEFAULT_NET].rpc,
//     status: 'disconnected',
// 	address: '',
// 	checking: false,
//     balance: '',
//     err:'',
// }

// const coins:CoinTypes = {}
// for(let k in networks) {
// 	coins[networks[k].coin] = {[k]:{address:'-', decimals:networks[k].decimals}}
// }
let txs = [] as TxType[]
let addedTokens = {} as {[token: string]: boolean}
try {
	let buf = window.localStorage.getItem(AppKey);
	if (buf) txs = JSON.parse(buf);
	buf = window.localStorage.getItem(AppKey + '-addedtokens');
	if (buf) addedTokens = JSON.parse(buf);
} catch (err) {
	console.log(err)
}

const initialState: StoreObject = {
	lang,
    L: locales[lang],

	loading: false,
	txs,
	addedTokens
}

export default createSlice({
	name: 'bridge',
	initialState,
	reducers: {
		update: (state:any, action) => {
			for (const k in action.payload) {
				if (state[k] === undefined) new Error('🦊 undefined account item')
				state[k] = action.payload[k]
			}
		}
	}
})
