import { toast } from 'react-toastify';
import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
// import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
// import Squarelink from "squarelink";

export const errHandler = (err: any) => {
	if (err) {
		console.log(err)
		if (err.code === 4001) {
			tips("You unsubscribed")
		} else if (err.code === 'NETWORK_ERROR') {
			tips("Please check your network connection!")
		} else {
			tips(err.message)
		}
	} else {
		console.log("ignorant mistake")
		tips("ignorant mistake")
	}
}

export const tips = (html: string) => {
	toast(html, {
		position: "top-right",
		autoClose: 3000,
	});
}
export const toHex = (num: any) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};
export const NF = (num: number, p: number = 2) => Number(num).toFixed(p).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const TF = (time: number, offset: number = 2) => {
	let iOffset = Number(offset);
	let date = time === undefined ? new Date(Date.now() * 1000 + (3600000 * iOffset)) : (typeof time === 'number' ? new Date(time * 1000 + (3600000 * iOffset)) : new Date(+time + (3600000 * iOffset)));
	let y = date.getUTCFullYear();
	let m = date.getUTCMonth() + 1;
	let d = date.getUTCDate();
	let hh = date.getUTCHours();
	let mm = date.getUTCMinutes();
	let ss = date.getUTCSeconds();
	let dt = ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
	return y + '-' + dt + ' ' + tt;
}

export const copyToClipboard = (text: string) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
	tips(text);
};



export const providerOptions = {
	walletlink: {
		package: CoinbaseWalletSDK, // Required
		options: {
			appName: "Web 3 Modal Demo", // Required
			infuraId: "9f8f5ec266c54f85aa9e66fbe230b077", // Required unless you provide a JSON RPC url; see `rpc` below
		},
	},
	walletconnect: {
		package: WalletConnect, // required
		options: {
			infuraId: "9f8f5ec266c54f85aa9e66fbe230b077", // required
		},
	},
};

// export const sitelink = "https://bridge.nxchainscan.com";
export const sitelink = "http://localhost:3000";