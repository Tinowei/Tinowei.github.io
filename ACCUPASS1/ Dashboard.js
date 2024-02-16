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



const subMenuTemplate = `<ul class="sub-menu">
<li><a href="">摘星計畫</a></li>
<li><a href="">購買EP</a></li>
<li><a href="">EP購買記錄</a></li>
</ul>`;


const sideMenuItems = document.querySelector('.middle .side-menu .menu-item:nth-child(2)');
const arrow = document.querySelector('.middle .side-menu .menu-item .fa-chevron-down');


    sideMenuItems.addEventListener('click', (event) => {
        event.stopPropagation(); 
        if (subMenuTemplate) {
            const isSubMenuAdded = sideMenuItems.classList.contains('sub-menu-added');
            const arrow = sideMenuItems.querySelector('.fa-chevron-down'); 
            if (!isSubMenuAdded) {
                // 如果子菜單未添加，在點擊的 side-menu menu-item 中的 a 元素後插入相應的 subMenuTemplate
                sideMenuItems.querySelector('a').insertAdjacentHTML('afterend', subMenuTemplate);
                sideMenuItems.classList.add('sub-menu-added');
                arrow.classList.add('rotate');
            } else {
                // 如果子菜單已添加，從點擊的 side-menu menu-item 中移除
                const subMenuContainer = sideMenuItems.querySelector('.sub-menu');
                subMenuContainer.parentNode.removeChild(subMenuContainer);
                sideMenuItems.classList.remove('sub-menu-added');
                arrow.classList.remove('rotate');
            }
        }
    });







const hb = document.querySelector('.header button.hamburger-btn');
