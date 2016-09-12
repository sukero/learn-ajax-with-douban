$(() => {
  let $booksElem = $('#books'),
      $pagesElem = $('#pages'),
      $searchInput = $('#search-input');

  let searchVal = '';

  // showCurrPageResults: 根据页码显示当页结果
  function showCurrPageResults(currArr, wholeArr, pager = 1, currSize) {
    if (pager === 1) {
      let currArr = wholeArr.slice(0, currSize);
      console.log(currArr);
    } else {
      let currArr = wholeArr.slice((pager-1)*currSize, currSize);
      console.log(currArr);
    }

    for (let bookInfo of currArr) {
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

  // 载入数据

      $('form').submit((e) => {
        e.preventDefault();

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

              // 分页
              let pageSize = 4,
                  pageCurr = 1,
                  currBookArr = bookInfoArr;

              // 显示页码
              for (let i=1; i<(bookInfoArr.length/pageSize); i++) {
                $pagesElem.append(
                  `<li class="page fl">${i}</li>`
                );
              }

              $('.page').on('click', (e) => {
                // 每次点击前，将pageCurr值改回默认值1
                pageCurr = 1;

                // 点击页码改变pageCurr的值
                pageCurr = pageCurr * $(e.target).text();
                console.log(pageCurr);

                // 清空搜索结果
                $booksElem.html('');

                showCurrPageResults(currBookArr, bookInfoArr, pageCurr, pageSize);

              });

            }

          });
      });



});
