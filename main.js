const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    // ユーザーが入力した値を取得する
    let userEnteredValue = inputBox.value;
    // ユーザーが（スペースでない）値を入力した場合
    if(userEnteredValue.trim() != 0){
        //  それなら、私たちの追加ボタンが光ります
        // 空白のみを入力した場合は、ライトアップされません
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
showTasks();
// Addボタンを操作するための関数
addBtn.onclick = ()=>{
    // ユーザーがAddボタンをクリックした場合、ユーザーが入力した値を取得する
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    // 作成した配列に新しい値を追加する
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray)); // オブジェクトからJSON形式の文字列に変換する
    showTasks();
    addBtn.classList.remove("active");
}
//タスクを表示する関数
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){  
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

//タスクを削除する関数
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New todo", JSON.stringify(listArray)); 
  showTasks(); 
}