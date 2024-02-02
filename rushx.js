const sub = ndk.subscribe({
    kinds: [1],
    since: Date.now() / 1000,
    authors: ["6544766bcb68b82eb1821d4fedf83796ba0c3f3a1b2852a7a3577061dc0e2de9"]
})
sub.on("event", async (event) => {
    const matched = event.content.match(/btntevent\(\{(.*?)\}\)/)
    if (!!matched) {
        const be = (new Function(`return {${matched[1]}}`))()
        console.log(be)
        const xPage = await newPage()
        await xPage.goto(be.url)
        await sleep(1000)
        try {
            if (be.op.includes('like')) {
                await sleep(50)
                await xPage.click("div[data-testid='cellInnerDiv']:first-child div[data-testid='like']")
            }

            if (be.op.includes('retweet')) {
                await sleep(50)
                await xPage.click("div[data-testid='cellInnerDiv']:first-child div[data-testid='retweet']")
                await sleep(50)
                await xPage.click("#layers div[data-testid='retweetConfirm']")
            }

            if (be.op.includes('reply') && be.reply) {
                await sleep(50)
                await xPage.click("div[data-testid='cellInnerDiv']:first-child div[data-testid='reply']")
                await xPage.focus("#layers div.DraftEditor-editorContainer")
                await xPage.type("", be.reply)
                await sleep(100)
                await xPage.click("#layers div[data-testid='tweetButton']")
            }
        } catch (error) {
            console.log(error)
        }
        await sleep(100)
        await xPage.close()
    }
})
