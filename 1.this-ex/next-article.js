function getArticleGenerator(articles) {

   let data = [...articles]
   return function () {
      let div = document.getElementById('content')
      let article = document.createElement('article')
      if (data.length > 0) {
         article.innerText = data[0]
         data.shift()
         div.appendChild(article);

      }
   }
}

