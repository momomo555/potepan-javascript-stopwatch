$(document).ready(function() {
  //開始時刻ミリ秒
  let start;
  //経過時間ミリ秒
  let milliSeconds;
  //タイマーid
  let timerId;
  //一時停止までの経過時間ミリ秒
  let holdTime = 0;

  //2桁前ゼロ埋め編集
  function addZero(time) {
    if (time < 10) {
      time = '0' + time;
    }
    return time;
  }

  //タイマーを進める
  function goTimer() {

    //現在時刻を取得
    let now = new Date();
    //経過時間の取得
    milliSeconds = now.getTime() - start.getTime() + holdTime;

    //時・分・秒・１０分の１秒の取得
    let hundredMilliSeconds = Math.floor(milliSeconds / 100);
    let seconds = Math.floor(milliSeconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    //時間の単位上限を超えないよう繰り下げ
    hundredMilliSeconds = hundredMilliSeconds - seconds * 10;
    seconds = seconds - minutes * 60;
    minutes = minutes - hours * 60;

    //前ゼロ埋め
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);
    hundredMilliSeconds = addZero(hundredMilliSeconds);

    //取得した経過時間をHTMLテキストに反映
    $("#timer").text(hours + ":" + minutes + ":" + seconds + ":" + hundredMilliSeconds);

  }

  //スタートボタン押下時
  $(".start").click(function() {

    //開始時刻を取得
    start = new Date();

    //タイマーを進める処理を繰り返し呼び出す
    timerId = setInterval(goTimer, 10);

    //ボタン活性・非活性制御
    $(this).prop("disabled", true);
    $(".stop").prop("disabled", false);
    $(".reset").prop("disabled", false);

  });

  //ストップボタン押下時
  $(".stop").click(function() {

    //タイマーを停止
    clearInterval(timerId);

    //一時停止までの経過時間を取得
    holdTime = milliSeconds;

    //ボタン活性・非活性制御
    $(".start").prop("disabled", false);
    $(this).prop("disabled", true);

  });

  //リセットボタン押下時
  $(".reset").click(function() {

    //タイマーを停止
    clearInterval(timerId);

    //一時停止までの経過時間をリセット
    holdTime = 0;

    //ボタン活性・非活性制御
    $("#timer").text("00:00:00:00");
    $(".start").prop("disabled", false);
    $(".stop").prop("disabled", true);
    $(this).prop("disabled", true);

  });

});
