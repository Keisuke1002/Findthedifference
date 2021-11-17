const APPLICATION_KEY = "d118e41f8f7747fa530f8867b4d947316309bdb98cdae53551674896825e8747";
const CLIENT_KEY = "e0269ec626cf3750eb712cae78b3d444fc1bbb1d8c0de74502ce6758285fe3bd";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";

const array = [];

let TestClass = ncmb.DataStore(DBName);
//データの登録
function save(){
  let test = new TestClass();
  let key = "score";
  const text = document.getElementById("timer");
  let value = timer-1;
  test.set(key, parseInt(value));
  test.save()
  .then (function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生:"+ err);
  });
}

//データの読み込み
function load(){
  TestClass
  .order("score")
  .fetchAll()
  .then(function(results){
    for(let i = 0; i < results.length; i++){
      console.log(results[i].score);
      console.log(results[0].score);
      console.log(results[0].score>timer);
      if(results[0].score>timer){
        alert("Game Clear"+timer);
      }
    }

  })
  .catch(function(err){
    console.log("エラー発生"+ err);
  });
}


let timer = null;
let max = 2;
let counter = 0;
function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size =5;
  let qNum = Math.floor(Math.random()*q.length);

  for(let i = 0; i < size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id","num"+i);
    s.addEventListener("click", function(){

      console.log(counter);
      if (this.textContent == q[qNum][1]){
        // alert("正解！");
        counter++;
        if(counter==max){
          alert("Game Clear");
          clearTimeout(timer);
          alert(timer-1);
          save();
          load();
        }else{
          correct.play();
          while (cells.firstChild){
            cells.removeChild(cells.firstChild);
          }
          gameStart();
        }
      }
      else{
        wrong.play();
      }

    });
    cells.appendChild(s);
    if(i % size == size -1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }

  let p = Math.floor(Math.random()* size * size);
  let ans = document.getElementById("num"+p);
  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() -start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout('time()', 1000);
}
