// 定義子選單的模板
const profileTemplate = `<div class="profile-container">
<div class="profile-info">
    <div class="photo">
        <img src="/logos and search/profile-photo.png" alt="">
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


const userImage = document.querySelector('.header .leftSide .userphoto img');


const headerContainer = document.querySelector('.contnet');

const profileSection = document.querySelector('.header .leftSide .userphoto');


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



const subMenuTemplate3 = `<ul class="sub-menu">
                            <li><a href="">形式</a></li>
                            <li><a href="">主題</a></li>
                            <li><a href="">類別</a></li>
                            <li><a href="">基本資訊</a></li>
                            <li><a href="">活動內容</a></li>
                            <li><a href="">嘉賓</a></li>
                            <li><a href="">票券設定</a></li>
                            <li><a href="">進階設定</a></li>
                            <li><a href="">報名表</a></li>
                        </ul>`;

const subMenuTemplate4 = `<ul class="sub-menu">
                            <li><a href="">售票資訊</a></li>
                        </ul>`

const subMenuTemplate5 =`<ul class="sub-menu">
                            <li><a href="">參加名單</a></li>
                        </ul>`


const sideMenuItems = document.querySelectorAll('.middle .side-menu .menu-item');
const arrow = document.querySelector('.middle .side-menu .menu-item .fa-chevron-down');

sideMenuItems.forEach((menuItem, index) => {
    menuItem.addEventListener('click', (event) => {
        event.stopPropagation(); 

        const subMenuTemplate = index === 2 ? subMenuTemplate3 : (index === 3 ? subMenuTemplate4 : (index === 4 ? subMenuTemplate5 : ''));

        if (subMenuTemplate) {
            const isSubMenuAdded = menuItem.classList.contains('sub-menu-added');
            const arrow = menuItem.querySelector('.fa-chevron-down'); 
            if (!isSubMenuAdded) {
                // 如果子菜單未添加，在點擊的 side-menu menu-item 中的 a 元素後插入相應的 subMenuTemplate
                menuItem.querySelector('a').insertAdjacentHTML('afterend', subMenuTemplate);
                menuItem.classList.add('sub-menu-added');
                arrow.classList.add('rotate');
            } else {
                // 如果子菜單已添加，從點擊的 side-menu menu-item 中移除
                const subMenuContainer = menuItem.querySelector('.sub-menu');
                subMenuContainer.parentNode.removeChild(subMenuContainer);
                menuItem.classList.remove('sub-menu-added');
                arrow.classList.remove('rotate');
            }
        }
    });
});



const hb = document.querySelector('.header button.hamburger-btn');
