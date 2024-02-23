const channelId = '6cddc57ffd43295160a81df273960ba85f421af129b89eebbae9ff024e5afd61'
const adminNpub = 'npub106fjcjfhmxup4yw4swk7ham96st9emxqd8hjrppeqglva7rvnw2q5edxxs'
const buildSelector = s => `div[data-testid='cellInnerDiv']:first-child div[data-testid='${s}']`

const authors = [nip19.decode(adminNpub).data]
const admin = ndk.getUser({ pubkey: authors[0] })
const follows = await admin.follows({ cacheUsage: "ONLY_RELAY" })
follows.forEach(user => authors.push(user.pubkey))

const sub = ndk.subscribe({ kinds: [42], since: Date.now() / 1000, authors, "#e": [channelId] })
sub.on("event", async (event) => {
    const matched = event.content.match(/冲推\((.*?),(.*?)\)/)
    if (!!matched) {
        const xPage = await newPage()
        await xPage.goto(matched[1])
        await sleep(1000)
        try {
            await xPage.click(buildSelector('reply'))
            await xPage.focus("#layers div.DraftEditor-editorContainer")
            await xPage.type("", beautify(matched[2]))
            await xPage.click("#layers div[data-testid='tweetButton']")
        } catch (error) { console.log(error) }
        await sleep(100)
        await xPage.close()
    }
})
