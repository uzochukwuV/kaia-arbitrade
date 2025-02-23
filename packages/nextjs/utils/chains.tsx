import {
    type Chain
} from 'viem'

export const crossfitestnet
    = {
        id
            :
            4157,
        name
            : 'CrossFi Testnet',
        nativeCurrency
            : {
            name
                : 'XFI', symbol
                : 'XFI', decimals
                : 18
        },
        rpcUrls
            : {
            default
                : {
                http
                    : ['https://rpc.testnet.ms']
            },
        },
        blockExplorers
            : {
            default
                : {
                name
                    : 'Etherscan', url
                    : 'https://test.xfiscan.com/api/1.0/'
            },
        },
        contracts
            : {

        },
    } as const satisfies Chain
