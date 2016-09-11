$(() => {
  let $booksElem = $('#books'),
      $searchInput = $('#search-input');

  let searchVal = '';

  // Promise: 载入数据
  let loadData = () => {
    let promise = new Promise((resolve,reject) => {

      $('form').submit((e) => {
        e.preventDefault();
        let searchVal = $searchInput.val();
        console.log(searchVal);

        return $.ajax({
              		type: 'GET',
              		url: `https://api.douban.com/v2/book/search?q=${searchVal}&count=4`,
              		dataType: 'jsonp',
                  success(data) {
                    resolve(data, searchVal);
                  }
              	});
      });


    });

    return promise;
  };


    loadData().then((data) => {
      console.log('then',data);
      console.log(searchVal);

      let bookInfoArr = data.books;
      for (let bookInfo of bookInfoArr) {
        $booksElem.append(
          `<li class="book">
            <a href="${bookInfo.alt}">
              <img class="book-image" src="${bookInfo.image}">
              <p class="book-title">${bookInfo.title}</p>
              <p class="book-publisher">${bookInfo.publisher}</p>
            </a>
          </li>`);
      }
    }).catch((error) => {
      console.log('出错了',error);
    });

});
