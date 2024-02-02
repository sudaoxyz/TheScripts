async function delayClick(page, selector, delay) {
    await sleep(delay)
    await page.click(selector)
}
const okxPage = await newPage('dapp')
await okxPage.goto("https://www.okx.com/cn/web3/marketplace/inscription/ordinals/tokens")

const w = new Wallet()
await w.initByWIF()
okxPage.connectWallet(w)
await sleep(1000)

try {
    await delayClick(okxPage, ".wallet-pc-connect-button.connect-wallet-button", 1000)
    await delayClick(okxPage, "#scroll-box button", 1000)
} catch (error) {
    console.log(error)
}
