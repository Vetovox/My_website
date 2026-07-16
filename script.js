// Функция для переключения страниц
function selectPage(clickedElement, pageName) {
    localStorage.setItem('lastSelectedPage', pageName);
    
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));
    if (clickedElement) clickedElement.classList.add('active');

    const contentArea = document.getElementById('content-area');

    if (pageName === 'Home Content') {
        contentArea.innerHTML = `<h2>Welcome!</h2><p>Это главная страница моего сайта.</p>`;
    } 
    else if (pageName === 'Gallery Content') {
        contentArea.innerHTML = `
            <h2 class="gallery-title">Gallery</h2>
            <div class="gallery-grid">
                <img src="1.jpg" alt="Картинка 1" onclick="openImage('1.jpg')">
                <img src="2.jpg" alt="Картинка 2" onclick="openImage('2.jpg')">
                <img src="Art_4.jpg" alt="Картинка 4" onclick="openImage('Art_4.jpg')">
                <img src="Art_5.jpg" alt="Картинка 5" onclick="openImage('Art_5.jpg')">
                <img src="Art_6.jpg" alt="Картинка 6" onclick="openImage('Art_6.jpg')">
                <img src="Art_7.jpg" alt="Картинка 7" onclick="openImage('Art_7.jpg')">
                <img src="Art_8.jpg" alt="Картинка 8" onclick="openImage('Art_8.jpg')">
                <img src="Art_9.jpg" alt="Картинка 9" onclick="openImage('Art_9.jpg')">
                <img src="Art_10.jpg" alt="Картинка 10" onclick="openImage('Art_10.jpg')">
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
    else {
        contentArea.innerHTML = `<h2>${pageName}</h2>`;
    }
}

// Функция для открытия картинки с перелистыванием
function openImage(src) {
    const images = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = images.findIndex(img => img.src.includes(src));

    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:9999; cursor:pointer;';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-height:80%; max-width:80%; border-radius:8px;';
    
    // Позиционируем кнопки по бокам от картинки
    const prevBtn = createBtn('<', 'left: 25%');
    const nextBtn = createBtn('>', 'right: 25%');

    function updateImage(index) {
        currentIndex = (index + images.length) % images.length;
        img.src = images[currentIndex].src;
    }

    prevBtn.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex - 1); };
    nextBtn.onclick = (e) => { e.stopPropagation(); updateImage(currentIndex + 1); };
    modal.onclick = () => { window.removeEventListener('keydown', keyHandler); modal.remove(); };

    const keyHandler = (e) => {
        if (e.key === 'ArrowLeft') updateImage(currentIndex - 1);
        if (e.key === 'ArrowRight') updateImage(currentIndex + 1);
        if (e.key === 'Escape') { window.removeEventListener('keydown', keyHandler); modal.remove(); }
    };
    window.addEventListener('keydown', keyHandler);

    modal.append(prevBtn, img, nextBtn);
    document.body.appendChild(modal);
}

function createBtn(text, position) {
    const btn = document.createElement('div');
    btn.innerHTML = text;
    // Фиксируем стрелки по вертикали по центру (top: 50%)
    btn.style.cssText = `position:absolute; ${position}; top:50%; transform:translateY(-50%); color:white; font-size:60px; font-weight:bold; user-select:none; padding:20px; cursor:pointer; z-index:10000;`;
    return btn;
}

// БЛОК ЗАПОМИНАНИЯ СТРАНИЦЫ
window.onload = function() {
    const lastPage = localStorage.getItem('lastSelectedPage');
    if (lastPage) {
        const links = document.querySelectorAll('.menu a');
        links.forEach(link => {
            if (link.textContent.trim() === lastPage.replace(' Content', '')) {
                selectPage(link, lastPage);
            }
        });
    }
};

// БЛОК ЗАЩИТЫ
document.addEventListener('contextmenu', event => event.preventDefault()); 
document.addEventListener('keydown', event => {
    if (event.ctrlKey && (event.key === 'c' || event.key === 'v' || event.key === 'u' || event.key === 'a')) event.preventDefault();
    if (event.key === 'F12') event.preventDefault();
});
document.addEventListener('dragstart', event => { if (event.target.tagName === 'IMG') event.preventDefault(); });