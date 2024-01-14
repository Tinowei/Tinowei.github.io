const addtodoInput = document.querySelector('#input_todo');
const addTodoBtn = document.querySelector('#add_todo_btn');
const todoListEl=document.querySelector('.todoList');

//初始化代辦事項陣列
let todoItemsArray=[];
let loaclStorageKey='mytodoItems';
let todoItem=["",false];

window.onload=function(){
    gettodoItemsArrayFromLS();
    renderingTodoList();
    settodoItemsArrayToLS();
}

function gettodoItemsArrayFromLS(){
    todoItemsArray=JSON.parse(localStorage.getItem(loaclStorageKey));
    if(todoItemsArray==null){
        todoItemsArray=[];
    }
}

function settodoItemsArrayToLS(){
    localStorage.setItem(loaclStorageKey,JSON.stringify(todoItemsArray));
}

addTodoBtn.addEventListener('click',()=>{
    let addtodoInputVal=addtodoInput.value.trim();
    if (addtodoInputVal !== '') {
        addtodoItem(addtodoInputVal);
        addYourTodoTotodoList(addtodoInputVal);
        settodoItemsArrayToLS();
        addtodoInput.value = '';
    } 
    else {
        alert('請輸入有效的代辦事項');
    }
})
//enter
document.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter' || event.keyCode === 13){
        let addtodoInputVal=addtodoInput.value.trim();
        if (addtodoInputVal !== '') {
            addtodoItem(addtodoInputVal);
            addYourTodoTotodoList(addtodoInputVal);
            settodoItemsArrayToLS();
            addtodoInput.value = '';
        } else {
            alert('請輸入有效的代辦事項');
        }
    }
});

function createDOM (item){
        let div_todoItem = document.createElement('div');
        let div_todoGroup = document.createElement('div');
        let span_inputGroupText = document.createElement('span');
        let input_checkbox = document.createElement('input');
        let input_displayTodo = document.createElement('input')
        let div_modifyAndDelete = document.createElement('div');
        let button_modifyBtn = document.createElement('button')
        let button_deleteBtn = document.createElement('button')

        div_todoItem.classList.add('todoItem', 'd-flex');
        div_todoItem.setAttribute('id',`${item.Content}`);
        div_todoGroup.classList.add('todo-group', 'input-group');

        span_inputGroupText.classList.add('input-group-text');

        input_checkbox.classList.add('form-check-input');
        input_checkbox.setAttribute('type', 'checkbox');

        input_displayTodo.classList.add('form-control', 'displayInput')
        input_displayTodo.setAttribute('type', "text")
        input_displayTodo.setAttribute('disabled', '');
        input_displayTodo.setAttribute('value', `${item.Content}`);

        div_modifyAndDelete=document.createElement('div');
        div_modifyAndDelete.classList.add('modifyAndDelete-group','ms-2')

        button_modifyBtn = document.createElement('button');
        button_modifyBtn.classList.add('btn', 'btn-warning');
        button_modifyBtn.setAttribute('type', 'button');
        button_modifyBtn.textContent = '編輯';

        button_deleteBtn = document.createElement('button');
        button_deleteBtn.classList.add('btn', 'btn-danger','ms-2');
        button_deleteBtn.setAttribute('type', 'button');
        button_deleteBtn.textContent = '刪除';

        div_modifyAndDelete.append(button_modifyBtn,button_deleteBtn);
        span_inputGroupText.append(input_checkbox);
        div_todoGroup.append(span_inputGroupText,input_displayTodo,div_modifyAndDelete);
        div_todoItem.append(div_todoGroup);
        todoListEl.append(div_todoItem);

        //一個代辦事項的DOM生成完後，替此代辦事項的按鈕及checkbox註冊事件
        addEventListeners(item);
}

//初始的渲染畫面
function renderingTodoList(){
    todoItemsArray.forEach((item,index)=>{
        createDOM(item,index);
        let input_checkbox = document.querySelector(`.todoItem:nth-child(${index + 1}) span.input-group-text input.form-check-input`);
        //checkbox status
        input_checkbox.checked = item.done;
    })
}

function addEventListeners(item){
    let todoItem = document.getElementById(`${item.Content}`);
    // 選擇剛剛生成的刪除按鈕
    let deleteBtn = todoItem.querySelector('button.btn-danger');
    // //選擇剛剛生成的編輯按鈕
    let modifyBtn = todoItem.querySelector('button.btn-warning');
    // //選擇剛剛生成的checkbox
    let input_checkbox = todoItem.querySelector('span.input-group-text input.form-check-input');

    modifyBtn.addEventListener('click', (event) => {
        // 編輯按鈕邏輯
        let input_displayTodo = todoItem.querySelector('.displayInput');
        let isDisabled = input_displayTodo.disabled;

        if (isDisabled) {
            // 啟用編輯模式
            input_displayTodo.removeAttribute('disabled');
            modifyBtn.classList.remove('btn-warning');
            modifyBtn.classList.add('btn-success');
            modifyBtn.textContent = '保存';
            deleteBtn.disabled = true;
        } else if (!isDisabled) {
            // 保存編輯內容
            // debugger
            //找到所點擊的那個todoItem，在todoList中的索引位置
            let index = Array.from(todoItem.parentNode.children).indexOf(todoItem);
            //透過找到的索引，去更新Content的內容
            todoItemsArray[index].Content = input_displayTodo.value;

            input_displayTodo.setAttribute('value', `${input_displayTodo.value}`);
            // item.Content = input_displayTodo.value;
            todoItem.setAttribute('id', `${input_displayTodo.value}`)
            input_displayTodo.setAttribute('disabled', '');
            modifyBtn.classList.remove('btn-success');
            modifyBtn.classList.add('btn-warning');
            modifyBtn.textContent = '編輯';
            deleteBtn.disabled = false;
            // update local storage
            settodoItemsArrayToLS();
        }
    })

    deleteBtn.addEventListener('click', () => {
        //找到所點擊的那個todoItem，在todoList中的索引位置
        let index = Array.from(todoItem.parentNode.children).indexOf(todoItem);
        //透過找到的索引，刪除那筆資料並同時更新localstorage
        todoItemsArray.splice(index, 1);
        todoItem.remove();
        settodoItemsArrayToLS();
        
    })

    input_checkbox.addEventListener('click',()=>{
        item.done = input_checkbox.checked;
        if (input_checkbox.checked) {
            input_checkbox.setAttribute('checked', '');
        } else {
            input_checkbox.removeAttribute('checked');
        }
        settodoItemsArrayToLS();                
    })
}

function addtodoItem(content){
    const todoItem={
        Content:content,
        done: false
    }
    todoItemsArray.push(todoItem)
    settodoItemsArrayToLS();
}

function addYourTodoTotodoList(addtodoInputVal){
        let newTodo = {
            Content: addtodoInputVal,
            done: false,
        };
        createDOM(newTodo);
        let todoItem = document.getElementById(`${newTodo.Content}`)
        let input_checkbox = todoItem.querySelector(`#${CSS.escape(addtodoInputVal)} span.input-group-text input.form-check-input`);
        input_checkbox.checked = newTodo.done;
}