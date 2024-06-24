let userList = getUserListFromLocalStorage();

let userBoxEl = document.querySelector("tbody");
let addUserForm = document.querySelector("#addUserForm");

addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addUser();
});

function renderData(arr) {
    let templateStr = ``;
    for (let i = 0; i < arr.length; i++) {
        templateStr += `
        <tr>
            <td>${arr[i].id}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].password}</td>
            <td>${arr[i].name}</td>
            <td>${arr[i].status ? "Đang hoạt động" : "Đang bị khóa"}</td>
            <td>
                <button style="background-color: #06b0f0; " onclick="updateStatus(${arr[i].id}, false)" ${!arr[i].status ? "disabled" : ""}>Khóa</button>
                <button style="background-color: #ff6d01;" onclick="updateStatus(${arr[i].id}, true)" ${arr[i].status ? "disabled" : ""}>Mở khóa</button>
            </td>
        </tr>
        `;
    }
    userBoxEl.innerHTML = templateStr;
}

function updateStatus(id, status) {
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
            userList[i].status = status;
            break;
        }
    }
    saveUserListToLocalStorage(userList);
    renderData(userList);
}


function addUser() {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let name = document.querySelector("#name").value;

    let newUser = {
        id: userList.length ? userList[userList.length - 1].id + 1 : 1,
        email: email,
        password: password,
        name: name,
        status: true,
    };

    userList.push(newUser);
    saveUserListToLocalStorage(userList);
    renderData(userList);

    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#name").value = "";
}

function saveUserListToLocalStorage(userList) {
    localStorage.setItem('userList', JSON.stringify(userList));
}

function getUserListFromLocalStorage() {
    let userListStr = localStorage.getItem('userList');
    return userListStr ? JSON.parse(userListStr) : [
        {
            id: 1,
            email: "levana@gmail.com",
            password: 12345,
            name: "Le Van A",
            status: true,
        },
        {
            id: 2,
            email: "levanb@gmail.com",
            password: 12345,
            name: "Le Van B",
            status: false,
        }
    ];
}

renderData(userList);
