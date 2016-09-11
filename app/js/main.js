$(() => {
  let $booksElem = $('#books'),
      $pagesElem = $('#pages'),
      $searchInput = $('#search-input');

  let searchVal = '';

  // 载入数据

      $('form').submit((e) => {
        e.preventDefault();

        // 清空搜索结果
        $booksElem.html('');

        // 获取搜索字段
        let searchVal = $searchInput.val();
        console.log(searchVal);

        $.ajax({
        		type: 'GET',
        		url: `https://api.douban.com/v2/book/search?q=${searchVal}&count=100`,
        		dataType: 'jsonp',
            success(data) {

              let bookInfoArr = data.books;

              // 分页
              let pageSize = 4;
              for (let i=1; i<(bookInfoArr.length/pageSize); i++) {
                $pagesElem.append(
                  `<li class="page fl">${i}</li>`
                );
              }

              // 显示结果
              for (let bookInfo of bookInfoArr) {
                $booksElem.append(
                  `<li class="book">
                    <a href="${bookInfo.alt}">
                      <img class="book-image" src="${bookInfo.image}">
                      <p class="book-title">${bookInfo.title}</p>
                      <p class="book-author">${bookInfo.author}</p>
                      <p class="book-publisher">${bookInfo.publisher}</p>
                    </a>
                  </li>`);
                }
            }

          });
      });



});
