document.addEventListener('DOMContentLoaded', () => {
    const achievementForm = document.getElementById('achievementForm');
    const achievementsList = document.getElementById('achievementsList');
    let achievements = [];

    // Function to add a new achievement
    function addAchievement(title, imageSrc) {
        const achievement = {
            id: achievements.length + 1,
            title: title,
            imageSrc: imageSrc
        };
        achievements.push(achievement);
        renderAchievements();
    }

    // Function to edit an existing achievement
    function editAchievement(id) {
        const achievement = achievements.find(a => a.id === id);
        const newTitle = prompt('Edit the achievement title:', achievement.title);
        if (newTitle) {
            achievement.title = newTitle;
            renderAchievements();
        }
    }

    // Function to delete an achievement
    function deleteAchievement(id) {
        achievements = achievements.filter(a => a.id !== id);
        renderAchievements();
    }

    // Function to render achievements to the list
    function renderAchievements() {
        achievementsList.innerHTML = '';
        achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${achievement.title}</h3>
                <img src="${achievement.imageSrc}" alt="${achievement.title}" width="100">
                <button onclick="editAchievement(${achievement.id})">Edit</button>
                <button onclick="deleteAchievement(${achievement.id})">Delete</button>
            `;
            achievementsList.appendChild(li);
        });
    }

    // Handling form submission to add new achievement
    achievementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('achievementTitle').value;
        const file = document.getElementById('certificateUpload').files[0];

        // Convert image to base64 for displaying in the UI
        const reader = new FileReader();
        reader.onloadend = function () {
            const imageSrc = reader.result;
            addAchievement(title, imageSrc);
        };
        if (file) {
            reader.readAsDataURL(file);
        }

        // Clear form after submission
        achievementForm.reset();
    });

    // Attach the editAchievement and deleteAchievement to global scope
    window.editAchievement = editAchievement;
    window.deleteAchievement = deleteAchievement;
});
