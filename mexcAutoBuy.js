const mexcPage = await newPage()
await mexcPage.goto("https://www.mexc.com/zh-CN/exchange/CHAX_USDT?_from=header")
await sleep(500)

setInterval(async () => {
await mexcPage.focus("#__next div[class*='actions_buyWrapper'] > div:nth-child(2) input")
await mexcPage.type("#__next div[class*='actions_buyWrapper'] > div:nth-child(2) input", "5")
await sleep(500)
await mexcPage.focus("#__next div[class*='actions_buyWrapper'] > div:nth-child(3) input")
await mexcPage.type("#__next div[class*='actions_buyWrapper'] > div:nth-child(3) input", "1.1")
await sleep(200)
await mexcPage.click("#__next div[class*='do-submit_buyBtnWrapper'] button")
}, 50000)
