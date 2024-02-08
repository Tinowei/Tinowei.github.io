const profileTemplate = `<div class="profile-container">
<div class="profile-info">
    <div class="photo">
        <img src="./logos and search/profile-photo.png" alt="">
    </div>
    <div class="detail">
        <div class="bage">尚未認證</div>
        <div class="username">
            <span>Username</span>
            <a href="">升級</a>
        </div>
    </div>
</div>
<div class="editor">
    <button class="browse">瀏覽主辦小站</button>
    <button class="edit">編輯主辦小站</button>
    <button class="edit-info">編輯認證資訊</button>
</div>
<div class="host-change">
    <button>切換主辦單位</button>
</div>
<div class="logout">
    <p>xxxx@gmail.com</p>
    <a href="">登出</a>
</div>
</div>`


const userImage = document.querySelector('.profile-section .profile-photo img');


const contentContainer = document.querySelector('.content');

const profileSection = document.querySelector('.profile-section');


let profileAdded = false;


userImage.addEventListener('click', () => {
    if (profileAdded) {

        profileSection.removeChild(profileSection.lastChild);
        profileAdded = false;
    } else {

        const profileContainer = document.createElement('div');
        profileContainer.innerHTML = profileTemplate;

        profileSection.appendChild(profileContainer);
        profileAdded = true;
    }
});


document.addEventListener('click', (event) => {
    if (!profileSection.contains(event.target) && profileAdded) {
        profileSection.removeChild(profileSection.lastChild);
        profileAdded = false;
    }
});


const subMenuTemplate = `<input type="checkbox" class="menu-input-item" id="menu-item2">
                <label for="menu-item2" class="icon-arrow"></label>
                <ul class="sub-menu">
                    <li><a href="">摘星計畫</a></li>
                    <li><a href="">購買EP</a></li>
                    <li><a href="">EP購買記錄</a></li>
                </ul>`


const sideMenuSecondMenuItem = document.querySelector('nav.side-menu .menu-container ul.aside-menu li.menu-item:nth-child(2)');


const navContainerSecondMenuItem = document.querySelector('nav.nav-container ul.aside-menu li.menu-item:nth-child(2)');


let sideMenuSubMenuAdded = false;
let navContainerSubMenuAdded = false;


sideMenuSecondMenuItem.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止冒泡

    if (!sideMenuSubMenuAdded) {

        sideMenuSecondMenuItem.querySelector('a').insertAdjacentHTML('afterend', subMenuTemplate);
        sideMenuSubMenuAdded = true;
    } else {
        const subMenuContainer = sideMenuSecondMenuItem.querySelector('.sub-menu');
        subMenuContainer.parentNode.removeChild(subMenuContainer);
        sideMenuSubMenuAdded = false;
    }
});

navContainerSecondMenuItem.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止冒泡

    if (!navContainerSubMenuAdded) {

        navContainerSecondMenuItem.querySelector('a').insertAdjacentHTML('afterend', subMenuTemplate);
        navContainerSubMenuAdded = true;
    } else {
        const subMenuContainer = navContainerSecondMenuItem.querySelector('.sub-menu');
        subMenuContainer.parentNode.removeChild(subMenuContainer);
        navContainerSubMenuAdded = false;
    }
});

document.addEventListener('click', () => {
    if (sideMenuSubMenuAdded) {
        const subMenuContainer = sideMenuSecondMenuItem.querySelector('.sub-menu');
        subMenuContainer.parentNode.removeChild(subMenuContainer);
        sideMenuSubMenuAdded = false;
    }

    if (navContainerSubMenuAdded) {
        const subMenuContainer = navContainerSecondMenuItem.querySelector('.sub-menu');
        subMenuContainer.parentNode.removeChild(subMenuContainer);
        navContainerSubMenuAdded = false;
    }
});

