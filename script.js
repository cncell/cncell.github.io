// функция для установки темы
function setTheme() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // проверяем, есть ли тема, сохранённая в data-theme атрибуте
    const savedTheme = document.documentElement.getAttribute("data-theme");

    if (savedTheme) {
        // если пользователь уже переключал тему, используем её
        changeTheme(savedTheme === "dark" ? "dark.css" : "light.css");
    } else {
        // если темы нет, используем системные настройки
        changeTheme(prefersDark ? "dark.css" : "light.css");
    }
}

// функция для смены темы
function changeTheme(themeFile) {
    let link = document.getElementById("theme-stylesheet");

    if (!link) {
        // если элемента <link> нет, создаём его
        link = document.createElement("link");
        link.id = "theme-stylesheet";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }

    link.href = themeFile;

    // сохраняем текущую тему в атрибуте data-theme
    const theme = themeFile.includes("dark") ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
}

// обработчик события для переключения темы
document.getElementById("toggle-theme").addEventListener("click", function () {
    const currentTheme = document.getElementById("theme-stylesheet").getAttribute("href");

    if (currentTheme === "light.css") {
        changeTheme("dark.css");
    } else {
        changeTheme("light.css");
    }
});

// устанавливаем тему при загрузке страницы
setTheme();

// отслеживаем изменения системной темы
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const prefersDark = e.matches;

    // если пользователь не переключал тему вручную, подстраиваемся под системные настройки
    const savedTheme = document.documentElement.getAttribute("data-theme");
    if (!savedTheme) {
        changeTheme(prefersDark ? "dark.css" : "light.css");
    }
});
