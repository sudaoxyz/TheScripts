const burnPage = await newPage()
await burnPage.goto("https://chax.world/burn")
console.log(1)
await waitForConfirm("请添加一次燃油再点击确认")
console.log(2)
const refreshPage = await newPage()
await refreshPage.goto("https://chax.world/burn")
setInterval(async () => {
await burnPage.click("img[class*=Action_image]")
}, 2000)
setInterval(async () => {
await refreshPage.reload()
}, 60000)Ï
