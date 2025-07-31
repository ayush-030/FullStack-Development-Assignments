async function fetchIdCards() {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const idCardsContainer = document.getElementById('id-cards-container');

 
    loadingMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    idCardsContainer.innerHTML = '';

    try {
       
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        renderIdCards(users);
    } catch (error) {
        console.error('Error fetching ID cards:', error);
        errorMessage.classList.remove('hidden');
    } finally {
        
        loadingMessage.classList.add('hidden');
    }
}


function renderIdCards(users) {
    const idCardsContainer = document.getElementById('id-cards-container');
    idCardsContainer.innerHTML = ''; 

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = `
            bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
            p-6 flex flex-col items-center text-center
            border border-gray-200 transform hover:-translate-y-1
        `;

     
        const avatarUrl = `https://i.pravatar.cc/150?img=${user.id}`;

        card.innerHTML = `
            <img src="${avatarUrl}" alt="${user.name}"
                 class="w-24 h-24 rounded-full object-cover border-4 border-purple-400 mb-4 shadow-md"
                 onerror="this.onerror=null;this.src='https://placehold.co/120x120/a78bfa/ffffff?text=${user.name.charAt(0).toUpperCase()}';">
            <h2 class="text-2xl font-semibold text-gray-900 mb-1">${user.name}</h2>
            <p class="text-md text-gray-600 mb-2">${user.company.name}</p>
            <div class="text-left w-full mt-3">
                <p class="text-sm text-gray-700 flex items-center mb-1">
                    <svg class="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    <span class="truncate">${user.email}</span>
                </p>
                <p class="text-sm text-gray-700 flex items-center mb-1">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2h2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2h2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                    <span class="truncate">${user.username}</span>
                </p>
                <p class="text-sm text-gray-700 flex items-center">
                    <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                    <span class="truncate">${user.address.city}</span>
                </p>
            </div>
        `;
        idCardsContainer.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', fetchIdCards);
