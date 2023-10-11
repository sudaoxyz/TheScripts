FlappyScript = [
    {
        name: "SyncSwapETH2USDTScroll-Lib",
        desc: "合约交互SyncSwap的逻辑",
        category: "示例",
        type: "contract",
        inputs: { amount: { type: "number", range: true } },
        logic: async (context) => {
            const wETHAddress = "0x000000000000000000000000000000000000800a";
            const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
            const poolAddress = "0x6CD7eceEc538b1313BC7788bfC5C6760D9c97245";
            const routerAddress = "0xC458eED598eAb247ffc19d15F19cf06ae729432c";

            const withdrawMode = 1;
            const swapData = AbiCoder.encode(
                ["address", "address", "uint8"],
                [wETHAddress, sender, withdrawMode],
            );

            const steps = [
                {
                    pool: poolAddress,
                    data: swapData,
                    callback: ZERO_ADDRESS,
                    callbackData: "0x",
                },
            ];

            const value = parseEther(getInput("amount", context));
            const paths = [
                {
                    steps: steps,
                    tokenIn: ZERO_ADDRESS,
                    amountIn: value,
                },
            ];

            const routerAbi = [
                "function swap(tuple(tuple(address pool, bytes data, address callback, bytes callbackData)[] steps, address tokenIn, uint256 amountIn)[] paths, uint256 amountOutMin, uint256 deadline) payable returns (tuple(address token, uint256 amount) amountOut)",
            ];
            const router = await contract(routerAddress, routerAbi);
            const response = await router.swap(
                paths,
                0,
                ethers.toBigInt(Math.floor(Date.now() / 1000)) + 1800n,
                {
                    value: value,
                },
            );
            await response.wait();
        },
    },

    {
        name: "SyncSwapETH2USDTScroll-C",
        desc: "合约交互",
        category: "示例",
        type: "contract",
        url: "https://www.fishx.xyz/contract.html",
        inputs: { amount: { type: "number", range: true } },
        logic: async (context) => {
            mustChangeAccount(checkedAccounts);
            const ctx = { inputs: { amount: { value: getInput("amount", context) } } };
            await runScript("SyncSwapETH2USDTScroll-Lib", ctx);
        }
    },

    {
        name: "SyncSwap-D",
        desc: "dapp交互",
        category: "D-dexes",
        type: "dapp",
        url: "https://syncswap.xyz/",
        mockBlock:
            "0x570d42d58bf59b115e184d4d1eb990670d81e7f91d675bd19adb756786c90ed2",
        mockTx: "0x881b2f5265238225907e865f328e42d2984a88a840132a903f2135ba715bb8e9",
        inputs: { 金额: { type: "number", range: true } },
        logic: async (context) => {
            mustChangeAccount(checkedAccounts);
            await click("left,bottom");
            await waitFor(200);
            await focus("#swap-input div.row input");
            await typeIn(getInput("金额", context));
            await waitFor(1000);
            await click("#swap-box button.swap-confirm");
        },
    },
    
    {
        name: "ScrollDepositETH-C",
        desc: "合约交互",
        category: "示例",
        type: "contract",
        url: "https://www.fishx.xyz/contract.html",
        inputs: { amount: { type: "number", range: true } },
        logic: async (context) => {
            mustChangeAccount(checkedAccounts)
            await send({
                to: "0xe5E30E7c24e4dFcb281A682562E53154C15D3332",
                data: `0x9f8420b3${encodeEther(getInput('amount', context))}0000000000000000000000000000000000000000000000000000000000009c40`,
                value: `${hexOfEtherSum(getInput('amount', context), '0.00000004')}`
            })
        }
    },

    {
        name: "ScrollDepositETH-D",
        desc: "dapp交互",
        category: "D-跨链",
        type: "dapp",
        url: "https://scroll.io/bridge",
        mockBlock: "0x7480fe62c855d86d91016764a2aa07374b17bc3213e9285ed13420875dc7da0c",
        mockTx: "0xdb58a3010e17b83f042b9de3cc1434f935eaa44dbf45f6783d4c6702789c8bb8",
        inputs: {
            金额: {
                type: "number",
                range: true
            }
        },
        logic: async (context) => {
            mustChangeAccount(checkedAccounts)
            await waitFor(200)
            await click("right,buttom")
            await focus("#\\:r0\\:")
            await typeIn(getInput("金额", context))
            await click("#\\:r2\\:")
            await waitFor(200)
            await click("#\\:r4\\: > div > button")
        }
    }
]