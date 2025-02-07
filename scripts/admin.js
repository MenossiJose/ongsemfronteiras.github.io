document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userList = document.getElementById('userList');
    const clearFormButton = document.getElementById('clearForm');

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addUser(userName.value, userEmail.value);
        userName.value = '';
        userEmail.value = '';
    });

    clearFormButton.addEventListener('click', function() {
        userName.value = '';
        userEmail.value = '';
    });

    // Funcao add user
    function addUser(name, email) {
        const user = {
            name: name,
            email: email,
            date: new Date().toLocaleString()
        };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }

    // Funcao exibe users
    function displayUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.date} - ${user.name} - ${user.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function() {
                deleteUser(index);
            });
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    // Funcao deletas
    function deleteUser(index) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }

    // Funcao de limpas
    function clearUsers() {
        localStorage.removeItem('users');
        displayUsers();
    }

    // Funcao de busca
    function searchUsers(query) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) || 
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        userList.innerHTML = '';
        filteredUsers.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.date} - ${user.name} - ${user.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', function() {
                deleteUser(index);
            });
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    }

    displayUsers();

    // Limpa form
    const clearAllButton = document.createElement('button');
    clearAllButton.textContent = 'Excluir Todos';
    clearAllButton.addEventListener('click', clearUsers);
    userList.parentNode.insertBefore(clearAllButton, userList.nextSibling);

    // Pesquisa user
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar Usuários';
    searchInput.addEventListener('input', function() {
        searchUsers(searchInput.value);
    });
    userList.parentNode.insertBefore(searchInput, userList);
});
