const tgPage = await newPage()
await tgPage.goto("https://web.telegram.org/k/#-2098293562")
await sleep(1000)
let content = ''
setInterval(async () => {
    const newContent = await tgPage.innerText("div.bubbles-group:last-child > div:last-child .bubble-content")
    if (content == newContent) {
        return
    }
    content = newContent
    const str = content.split("|||")[0]
    if (str) {
        try {
            const params = JSON.parse(str)
            console.log('get params', params)
            const xPage = await newPage()
            await xPage.goto("https://twitter.com/0xChamcha/status/" + params.id)
            await sleep(1000)

            await xPage.click("div[data-testid='like']")
            await sleep(1000)
            await xPage.close()
        } catch (error) {
        }
    }
}, 1000);
