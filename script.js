function selectPage(clickedElement, pageName) {
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));
    clickedElement.classList.add('active');

    const contentArea = document.getElementById('content-area');

    if (pageName === 'Gallery Content') {
        contentArea.innerHTML = `
            <h2>Галерея</h2>
            <div class="gallery-grid">
                <img src="1.jpg" alt="Картинка 1" onclick="openImage('1.jpg')">
                <img src="2.jpg" alt="Картинка 2" onclick="openImage('2.jpg')">
            </div>
        `;
    } 
    else if (pageName === 'About Content') {
        contentArea.innerHTML = `<h2>Об авторе</h2><p>Текст об авторе.</p>`;
    } 
    else if (pageName === 'My Game Content') {
        contentArea.innerHTML = `<h2>My Game</h2><p>Описание игры.</p>`;
    }
    else if (pageName === 'Devlog Content') {
        contentArea.innerHTML = `<h2>Devlog</h2><p>Новости разработки.</p>`;
    }
    else if (pageName === 'Contact Content') {
        contentArea.innerHTML = `<h2>Контакты</h2><p>Связаться со мной можно через соцсети.</p>`;
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
    modal.onclick = () => modal.remove(); // Клик по фону закрывает картинку

    const img = document.createElement('img');
    img.src = src;
    img.style.maxHeight = '90%';
    img.style.maxWidth = '90%';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

    modal.appendChild(img);
    document.body.appendChild(modal);
}