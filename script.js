// Функция для установки темы из cookies
function setThemeFromCookies() {
    const theme = getCookie("theme");
    if (theme === "dark") {
        changeTheme("dark.css");
    } else {
        changeTheme("light.css");
    }
}

// Функция для получения значения из cookies
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Функция для установки cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // через сколько дней cookie удалится
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Функция для смены темы
function changeTheme(themeFile) {
    const link = document.getElementById("theme-stylesheet");
    const newLink = document.createElement("link");
    
    newLink.id = "theme-stylesheet";
    newLink.rel = "stylesheet";
    newLink.href = themeFile;

    // Удаляем старый элемент <link> и добавляем новый
    link.parentNode.removeChild(link);
    document.head.appendChild(newLink);
}

// Обработчик события для переключения темы
document.getElementById("toggle-theme").addEventListener("click", function() {
    const currentTheme = document.getElementById("theme-stylesheet").getAttribute("href");

    if (currentTheme === "light.css") {
        changeTheme("dark.css");
        setCookie("theme", "dark", 365); // сохраняем в cookies на 1 год
    } else {
        changeTheme("light.css");
        setCookie("theme", "light", 365);
    }
});

// Устанавливаем тему при загрузке страницы
setThemeFromCookies();
