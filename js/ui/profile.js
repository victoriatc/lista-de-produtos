//link user name
function createHelloUserLink(userName) {
    const link = document.createElement("a"); 
    link.textContent = `Hello, ${userName}`; 
    link.href = "#"; 
    link.id = "hello-user-link"; 
    return link;
}


function addLinkToUserInfo(userName) {
    const userInfo = document.querySelector("#user-info");
    if (userInfo) {
       
        userInfo.innerHTML = ""; 
      
        const link = createHelloUserLink(userName); 
        userInfo.appendChild(link); 
    }
}

addLinkToUserInfo("User");

document.addEventListener("DOMContentLoaded", loadUserProfile);


// Fetch users from API
export async function fetchUsers() {
    try {
        const response = await fetch("https://fakestoreapi.com/users");
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Network error or API is unavailable");
    }
}


// Load user by ID
export async function getUserById(id) {
    try {
        const users = await fetchUsers();
        return users.find((user) => user.id === id);
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
        return null;
    }
}

// Update the name in the "Hello, User Name" link dynamically
export async function updateUserName() {
    try {
        const user = await getUserById(1); 
        if (user) {
            const userInfoContainer = document.querySelector('.user-info');
            const paragraph = document.createElement('p');
            paragraph.className = 'username';

            // Create a link with the user's name and profile page
            const userLink = document.createElement('a');
            userLink.textContent = `Hello, ${user.name}`;
            userLink.href = `/profile.html?id=${user.id}`;
            userLink.target = "_blank"; 
            userLink.rel = "noopener noreferrer"; 
            paragraph.appendChild(userLink);
            userInfoContainer.prepend(paragraph);
        } else {
            console.error("User not found");
        }
    } catch (error) {
        console.error("Error updating user name:", error.message);
    }
}


// Create user profile dynamically for the profile page
export function createUserProfile(user) {
    const container = document.createElement("div");
    container.setAttribute("id", "user-profile");

    // Create and add profile fields
    container.appendChild(createProfileField("Name", user.name));
    container.appendChild(createProfileField("Email", user.email));
    container.appendChild(createProfileField("Phone", user.phone));
    const address = `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;
    container.appendChild(createProfileField("Address", address));

    return container;
}

// Helper function to create profile fields
function createProfileField(label, value) {
    const paragraph = document.createElement("p");

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    const span = document.createElement("span");
    span.textContent = value;

    paragraph.append(strong, span);
    return paragraph;
}

// Load user profile when visiting the profile page
export async function loadUserProfile() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id'); 
    const user = await getUserById(parseInt(userId));

    if (user) {
        const profileContainer = document.querySelector("#user-info");
        profileContainer.appendChild(createUserProfile(user)); 
    } else {
        console.error('User not found');
    }
}




