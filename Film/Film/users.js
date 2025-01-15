document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.querySelector('#users');

    function fetchUsers() {
        fetch('https://dummyjson.com/users?limit=10')
            .then(response => response.json())
            .then(data => {
                displayUsers(data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    function displayUsers(users) {
        usersContainer.innerHTML = '';
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'grid-item';
            userDiv.innerHTML = `
                <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                <div>
                    <strong>${user.firstName} ${user.lastName}</strong>
                    <span>Email: ${user.email}</span>
                    <span>Age: ${user.age}</span>
                    <span>Phone: ${user.phone}</span>
                </div>
            `;
            usersContainer.appendChild(userDiv);
        });
    }

    fetchUsers();
});
