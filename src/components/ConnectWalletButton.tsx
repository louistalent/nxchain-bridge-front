import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providerOptions, toHex } from "../util";
import { useEffect, useState } from "react";
import useStore from "../useStore";

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
});
const testnet = process.env.REACT_APP_TESTNET;
const ConnectButton = () => {
    const [account, setAccount] = useState<any>("");
    const [library, setLibrary] = useState<any>();
    const [chainId, setChainId] = useState<any>();
    const { update } = useStore();
    const G = useStore();

    var styledAddress = account
        ? account.slice(0, 5) + "..." + account.slice(-5)
        : "";

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            provider.on("accountsChanged", async (accounts: any) => {
                if (accounts.length == 0) {
                    await web3Modal.clearCachedProvider();
                    refreshState();
                }
            })
            const library: any = new ethers.providers.Web3Provider(provider);
            const accounts: any = await library.listAccounts();
            const network: any = await library.getNetwork();
            setLibrary(library);
            setChainId(network.chainId);
            if (accounts) {
                update({ address: accounts[0] })
                setAccount(accounts[0]);
            }
            update({ chainId: network.chainId })

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (testnet) {
            switchNetwork("97");
        } else {
            switchNetwork("56");
        }
    }, [account])

    useEffect(() => {
        setAccount(G.address);
    }, [G.address])

    const switchNetwork = async (network: any) => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: toHex(network) }],
            });
        } catch (switchError: any) {
            if (switchError.code === 4902) {
                try {
                    await library.provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: toHex("137"),
                                chainName: "Polygon",
                                rpcUrls: ["https://polygon-rpc.com/"],
                                blockExplorerUrls: ["https://polygonscan.com/"],
                            },
                        ],
                    });
                } catch (addError) {
                    throw addError;
                }
            }
        }
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    const refreshState = () => {
        setAccount("");
    };

    const disconnect = async () => {
        await web3Modal.clearCachedProvider();
        update({ address: '' })
        refreshState();
    }

    return (
        <>
            {!account ? (
                <button
                    className={'wallet-connect'}
                    onClick={connectWallet}
                >
                    <p className={''}>
                        Connect Wallet
                    </p>
                </button>
            ) : (
                <button
                    className={'wallet-connect'}
                    onClick={disconnect}
                >
                    <p className={''}>
                        {styledAddress}
                    </p>
                </button>
            )}
        </>
    )
}

export default ConnectButton;