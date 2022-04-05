"use strict";
//クラス　リファクタリング

//インスタンス
//トリガー,adress,住所コード

class SearchPostCode {
  constructor(trigger) {
    this.trigger = trigger;
    // this.postCode = null;
    this.add1 = document.getElementById("address1");
    this.add2 = document.getElementById("address2");
    this.add3 = document.getElementById("address3");
  }
  async StartEvent() {
    this.trigger.addEventListener("click", () => {
      this.init();
    });
  }
  async fetchData() {
    const input = document.getElementById("input");
    const postcode = input.value.replace("-", "");
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`
    );
    console.log(response);
    if (response.ok) {
      //JSONデータをオブジェクトへ加工
      const JsonCode = await response.json();
      //住所が見つからなければエラーを返す

      if (!JsonCode.results.length || JsonCode.results != "null") {
        JsonCode.message = "入力値が間違っています";
        alert(JsonCode.message);
      }
      return JsonCode;
    }
  }
  async init() {
    const PostCode = await this.fetchData();

    this.add1.value = PostCode.results[0].address1;
    this.add2.value = PostCode.results[0].address2;
    this.add3.value = PostCode.results[0].address3;
  }
}
const getPostCode = new SearchPostCode(document.getElementById("search"));
getPostCode.StartEvent();
