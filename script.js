function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function selectPage(clickedElement, pageName) {
    localStorage.setItem('lastSelectedPage', pageName);
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));
    if (clickedElement) clickedElement.classList.add('active');

    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }

    const contentArea = document.getElementById('content-area');

    if (pageName === 'Home Content') {
        // Укажи здесь имя файла своей САМОЙ ПОСЛЕДНЕЙ картинки
        const latestGalleryImg = "Art_10.jpg"; 

        contentArea.innerHTML = `
            <div class="home-container">
                <section class="hero-block">
                    <h1>VETOVOX</h1>
                    <p>Здесь я работаю над игрой, книгой и комиксом.</p>
                </section>

                <div class="news-main-wrapper">
                    <div class="news-column">
                        <h3>Девлог</h3>
                        <div class="news-card text-card" onclick="selectPage(null, 'Devlog Content')">
                            <p>Последняя запись из девлога</p>
                        </div>
                    </div>
                    <div class="news-column">
                        <h3>Игра</h3>
                        <div class="news-card text-card" onclick="selectPage(null, 'My Game Content')">
                            <p>Последние изменения в игре</p>
                        </div>
                    </div>
                    <div class="news-column">
                        <h3>Галерея</h3>
                        <div class="news-card gallery-preview" onclick="selectPage(null, 'Gallery Content')">
                            <img src="${latestGalleryImg}" alt="Последний арт">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else if (pageName === 'My Game Content') {
        contentArea.innerHTML = `<h2>My Game</h2><p>Здесь информация о моей игре.</p>`;
    }
    else if (pageName === 'Devlog Content') {
        contentArea.innerHTML = `<h2>Devlog</h2><p>Здесь записи о разработке.</p>`;
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
            </div>`;
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
            </div>`;
    } 
    else if (pageName === 'Contact Content') {
        contentArea.innerHTML = `
            <div class="about-container">
                <div class="about-text" style="width: 100%;">
                    <h2 class="gallery-title" style="margin-bottom: 20px;"></h2>
                    <div class="contact-wrapper">
                        <p class="about-text-custom" style="margin: 0;">For business inquiries, please reach out via email:</p>
                        <div style="display: flex; align-items: center; gap: 15px; margin-top: 10px;">
                            <span class="email-link">allerti065@gmail.com</span>
                            <div class="copy-icon" onclick="copyEmail()" title="Скопировать">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="about-art">
                    <img src="Art_3.jpg" alt="Contact Art">
                </div>
            </div>`;
    }
}

function copyEmail() {
    const email = "allerti065@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const icon = document.querySelector('.copy-icon');
        icon.classList.add('copied');
        setTimeout(() => { icon.classList.remove('copied'); }, 2000);
    });
}

function openImage(src) {
    const images = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = images.findIndex(img => img.src.includes(src));
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:flex; justify-content:center; align-items:center; z-index:9999; cursor:pointer;';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'max-height:80%; max-width:80%; border-radius:8px;';
    
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
    btn.className = 'nav-arrow'; 
    btn.style.cssText = `position:absolute; ${position}; top:50%; transform:translateY(-50%); color:white; font-size:60px; font-weight:bold; user-select:none; padding:20px; cursor:pointer; z-index:10000;`;
    return btn;
}

window.onload = function() {
    const lastPage = localStorage.getItem('lastSelectedPage');
    if (lastPage) {
        const links = document.querySelectorAll('.menu a');
        links.forEach(link => { if (link.textContent.trim() === lastPage.replace(' Content', '')) selectPage(link, lastPage); });
    } else {
        const firstLink = document.querySelector('.menu a');
        selectPage(firstLink, 'Home Content');
    }
};