$(() => {

  let $booksElem = $('#books'),
      $pagesElem = $('#pages'),
      $searchInput = $('#search-input');

  let searchVal = '';

  // showCurrPageResults: 根据页码显示当页结果
  function showCurrPageResults(wholeArr, pager, currSize) {

    if (pager === 1) {
      let currArr = wholeArr.slice(0, currSize);
      return currArr;
    } else if (pager > 1) {
      let currArr = wholeArr.slice((pager-1)*currSize, pager*currSize);
      return currArr;
    }

  }

  // 载入数据

      $('form').submit((e) => {
        e.preventDefault();

        // Error Handling
        let doubanRequestTimeout = setTimeout(() => {
          $booksElem.text("failed to get douban resources");
        }, 8000);

        // 清空搜索结果和分页结果
        $booksElem.html('');
        $pagesElem.html('');

        // 获取搜索字段
        let searchVal = $searchInput.val();
        console.log(searchVal);

        $.ajax({
        		type: 'GET',
        		url: `https://api.douban.com/v2/book/search?q=${searchVal}&count=100`,
        		dataType: 'jsonp',
            success(data) {

              let bookInfoArr = data.books;

              // 每页要显示的结果数量
              let pageSize = 8;

              // 显示页码
              for (let i=1; i<(bookInfoArr.length/pageSize); i++) {
                $pagesElem.append(
                  `<li class="page fl">${i}</li>`
                );
              }

              // 提交搜索后，先渲染出第一页的结果
              let firstPageResults = bookInfoArr.slice(0, pageSize);
              for (let bookInfo of firstPageResults) {
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


              $('.page').on('click', (e) => {

                // 当前页的页码
                let pageCurr = 1;

                // 点击任意页码，将这个页码设为pageCurr的值
                pageCurr = pageCurr * $(e.target).text();

                // 清空当前页显示的搜索结果
                $booksElem.html('');

                // 返回当前页应该显示的结果数组
                let currBookArr = showCurrPageResults(bookInfoArr, pageCurr, pageSize);

                // 渲染当前页结果
                for (let bookInfo of currBookArr) {
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

              });

              clearTimeout(doubanRequestTimeout);

            }

          });
      });
});
