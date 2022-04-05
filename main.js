//flow
//1.住所入力
//2.住所検索ボタン
//3.住所検索
const search = document.getElementById("search");
const ad1 = document.getElementById("address1");
const ad2 = document.getElementById("address2");
const ad3 = document.getElementById("address3");

search.addEventListener("click", () => {
  //入力値を取得
  const input = document.getElementById("input");
  const postcode = input.value.replace("-", "");

  init(); //非同期関数

  //APIからデータを取得
  async function fetchData() {
    // console.log(postcode);
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`
    );

    if (response.ok) {
      //JSONデータをオブジェクトへ加工
      const JsonCode = await response.json();
      //住所が見つからなければエラーを返す
      if (!JsonCode.results.length) {
        throw new Error("入力値が間違っています");
      }
      return JsonCode;
    }
  }
  //データを加工
  async function init() {
    try {
      const PostCode = await fetchData();
      ad1.value = PostCode.results[0].address1;
      ad2.value = PostCode.results[0].address2;
      ad3.value = PostCode.results[0].address3;
    } catch (e) {
      alert(e);
    }
  }
});
