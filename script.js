document.addEventListener('DOMContentLoaded', function () {
    // Create a variable for the form
    const todoForm = document.querySelector('form');
    // Create a variable for the parent of the list... UL
    const todoListUl = document.querySelector('ul');
    // Create a variable for the Save List button
    const saveAllBtn = document.querySelector('#saveAll');

    // Check if there are existing items in localStorage returns 'null' if it isn't there
    // *I can get this to partially work, but not the whole list of items. 
    const storedItems = JSON.parse(localStorage.getItem('list_item0'));
    console.log("This is stored: " + storedItems);

    // If items exist, load them from localStorage
    if (storedItems) {
        console.log("I've got that saved");
        const listItem = document.createElement('li');
        listItem.innerHTML = storedItems;
        todoListUl.appendChild(listItem);
        // for (const item of storedItems) {
        //     const listItem = document.createElement("li");
        //     listItem.textContent = item;
        //     todoListUl.appendChild(listItem);
        // }
    }

    // Add an EventListener to the Form and the UL
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("Item submitted to the Todo List");

        //Create a Li to store the Todo Item
        const todoItemLi = document.createElement('li');
        //Create a Remove button to add to the li
        const removeBtn = document.createElement('button');

        //Customize the text of the button
        removeBtn.innerHTML = 'remove';
        removeBtn.classList = 'removeMe';

        // Select the todo text box, get text, store in li and append ul
        const formInput = todoForm.querySelector('#todo');
        const newTodoItem = formInput.value;
        todoItemLi.innerHTML = newTodoItem + "  ";

        // - Add a new todo w/ a remove button
        todoItemLi.appendChild(removeBtn);
        todoListUl.appendChild(todoItemLi);

        // Clear the input after submission
        formInput.value = "";

    });

    // Add an event listener to the parent and use 'target' to isolate the
    //  item being clicked. tagName will tell you the type of element 
    // if the text of the todo is clicked modify the text to strikethrough
    // if the remove button is clicked then remove the item from the list
    todoListUl.addEventListener('click', function (e) {
        console.log(e.target.tagName);
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checkedOff');
        } else if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
        }
    });

    // Event Listener for the Save button
    saveAllBtn.addEventListener('click', function (e) {
        e.preventDefault();
        saveData();
    });

    /** 
     * The saveData() function will save the current list in local 
     *  storage when clicked.
     *  
     */
    function saveData() {
        const currentList = todoListUl.querySelectorAll('li');

        let count = 0;
        for (let item of currentList) {
            localStorage.setItem(`list_item${count}`, JSON.stringify(currentList[count].innerHTML));
            count++;
        }

        //Not sure if this is saving all of the HTML data inside of the li element
        localStorage.setItem('savedToDos', JSON.stringify(currentList));

        // This is some testing code
        // localStorage.setItem('List_Item', JSON.stringify(todoItemLi.innerHTML));

        // console.log(currentList.length);
        // console.log(currentList[0]);
    }

});

