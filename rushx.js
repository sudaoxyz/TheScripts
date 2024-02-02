function buildSelector(s) {
    return `div[data-testid='cellInnerDiv']:first-child div[data-testid='${s}']`
}
async function delayClick(page, selector, delay) {
    await sleep(delay);
    await page.click(selector)
}
const authors = ["6544766bcb68b82eb1821d4fedf83796ba0c3f3a1b2852a7a3577061dc0e2de9"]
const sub = ndk.subscribe({ kinds: [1], since: Date.now() / 1000 - 10000, authors })
sub.on("event", async (event) => {
    const matched = event.content.match(/btntevent\(\{(.*?)\}\)/)
    if (!!matched) {
        const be = (new Function(`return {${matched[1]}}`))()
        const xPage = await newPage()
        await xPage.goto(be.url)
        await sleep(1000)
        try {
            if (be.op.includes('like')) await delayClick(xPage, buildSelector('like'), 50)
            if (be.op.includes('retweet')) {
                await delayClick(xPage, buildSelector('retweet'), 50)
                await delayClick(xPage, "#layers div[data-testid='retweetConfirm']", 50)
            }
            if (be.op.includes('reply') && be.reply) {
                await delayClick(xPage, buildSelector('reply'), 50)
                await xPage.focus("#layers div.DraftEditor-editorContainer")
                await xPage.type("", be.reply)
                await delayClick(xPage, "#layers div[data-testid='tweetButton']", 100)
            }
        } catch (error) { console.log(error) }
        await sleep(100)
        await xPage.close()
    }
})
