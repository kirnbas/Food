import {getResource} from "../services/services";

function cards() {
    // Menu

    // const menucontainer = document.querySelector(".menu__field .container");
    // menucontainer.innerHTML = "";

    class Menu {
        constructor(title, description, imgsrc, imgalt, totalCost, parentSelector, ...classes) {
            this.title = title;
            this.description = description;
            this.imgsrc = imgsrc;
            this.imgalt = imgalt;
            this.totalCost = totalCost;            
            this.transfer = 27;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            this.totalCost *= this.transfer;
        }

        render() {
            const menuItem = document.createElement("div");
            
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                menuItem.classList.add(this.element);
            }
            else {
                this.classes.forEach(className => menuItem.classList.add(className));
            }
            
            this.parent.append(menuItem);

            const menuImg = document.createElement("img");
            menuImg.src = this.imgsrc;
            menuImg.alt = this.imgalt;

            const menuTitle = document.createElement('h3');
            menuTitle.classList.add('menu__item-subtitle');
            menuTitle.innerHTML = this.title;

            const menuDescription = document.createElement("div");
            menuDescription.classList.add('menu__item-descr');
            menuDescription.innerHTML = this.description;

            const menuDivider = document.createElement("div");
            menuDivider.classList.add("menu__item-divider");

            const menuPrice = document.createElement("div");
            menuPrice.classList.add('menu__item-price');
            const menuItemCost = document.createElement("div");
            menuItemCost.classList.add("menu__item-cost");
            menuItemCost.innerHTML = 'Цена:';
            const menuItemTotal = document.createElement("div");
            menuItemTotal.classList.add("menu__item-total");
            menuItemTotal.innerHTML = `<span>${this.totalCost}</span> грн/день`;
            menuPrice.append(menuItemCost, menuItemTotal);

            menuItem.append(menuImg, menuTitle, menuDescription, menuDivider, menuPrice);
        }
    }

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new Menu(title, descr, img, altimg, price, ".menu__field .container").render();
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(data => data.data.forEach(({img, altimg, title, descr, price}) => {
            new Menu(title, descr, img, altimg, price, ".menu__field .container").render();
        }));

    // getResource("http://localhost:3000/menu")
    //     .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');

            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price}</span> грн/день</div>
                    </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }
}

export default cards;