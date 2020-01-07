function getArticleGenerator(articles) {
    let div = document.createElement('div')
    div.width === 600
    //div.text-align === center
    //div.font.size === 1.5
    let p = document.createElement('p')
    p.innerText = articles[0]
    div.appendChild(p)
    let content = document.querySelector("body > div:nth-child(2) > button")
    content.appendChild(div)

    
}
//div{width:600px; text-align: center; font-size: 1.5em} article{border: 2px solid blue; padding: 2em; margin: 1em}