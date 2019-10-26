new Vue({
  el: '#app',
  mounted () {
    fetch(
      'https://script.google.com/macros/s/AKfycbwpMKf5237VlebQuUNjHKYGvLrOi3bdGV1Oa2CKsKAMmv_-mpM/exec',
    )
      .then(res => res.json())
      .then(result => {
        console.log(result);
      },);
  }
})
