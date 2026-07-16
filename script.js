// Функция для переключения страниц
function selectPage(clickedElement, pageName) {
    // 1. Сохраняем текущий выбор в память браузера
    localStorage.setItem('lastSelectedPage', pageName);
    
    // Обновляем класс active у меню
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));
    if (clickedElement) clickedElement.classList.add('active');

    const contentArea = document.getElementById('content-area');

    if (pageName === 'Home Content') {
        contentArea.innerHTML = `<h2>Welcome!</h2><p>Это главная страница моего сайта.</p>`;
    } 
    else if (pageName === 'Gallery Content') {
        contentArea.innerHTML = `
            <h2>Gallery</h2>
            <div class="gallery-grid">
                <img src="1.jpg" alt="Картинка 1" onclick="openImage('1.jpg')">
                <img src="2.jpg" alt="Картинка 2" onclick="openImage('2.jpg')">
            </div>
        `;
    } 
    else if (pageName === 'About Content') {
        contentArea.innerHTML = `
            
            <div class="about-container">
                <div class="about-text">
                    <p class="about-text-custom">Hi! I'm VETOVOX!</p>
                    <p class="about-text-custom">My name is Kate and this is my creative corner.</p>
                    <p class="about-text-custom">Here I am working on a game, a book, and a comic. My inspiration comes from music, the sound of rain, and wide open fields.</p>
                    <p class="about-text-custom">This website is my journey in development and creativity. I would be happy to have you join me!</p>
                </div>
                <div class="about-art">
                    <img src="Art_3.jpg" alt="Мой арт">
                </div>
            </div>
        `;
    } 
    else if (pageName === 'My Game Content') {
        contentArea.innerHTML = `<h2>My Game</h2><p>Описание игры.</p>`;
    }
    else if (pageName === 'Devlog Content') {
        contentArea.innerHTML = `<h2>Devlog</h2><p>Новости разработки.</p>`;
    }
    else if (pageName === 'Contact Content') {
        contentArea.innerHTML = `<h2>Contact</h2><p>Связаться со мной можно через соцсети.</p>`;
    }
    else {
        contentArea.innerHTML = `<h2>${pageName}</h2>`;
    }
}

// Функция для открытия картинки на весь экран
function openImage(src) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.85)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.cursor = 'pointer';
    modal.onclick = () => modal.remove(); 

    const img = document.createElement('img');
    img.src = src;
    img.style.maxHeight = '90%';
    img.style.maxWidth = '90%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

    modal.appendChild(img);
    document.body.appendChild(modal);
}

// ВОТ ЭТОТ БЛОК ЗАПОМИНАЕТ СТРАНИЦУ
window.onload = function() {
    const lastPage = localStorage.getItem('lastSelectedPage');
    if (lastPage) {
        // Находим нужную ссылку в меню по тексту
        const links = document.querySelectorAll('.menu a');
        links.forEach(link => {
            if (link.textContent.trim() === lastPage.replace(' Content', '')) {
                selectPage(link, lastPage);
            }
        });
    }
};