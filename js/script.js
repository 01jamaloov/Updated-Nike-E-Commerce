// DARK AND LIGHT MODE
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  if (document.body.classList.contains(darkTheme)) {
    return "dark";
  } else {
    return "light";
  }
};

const getCurrentIcon = () => {
  if (themeButton.classList.contains(iconTheme)) {
    return "bx-moon";
  } else {
    return "bx-sun";
  }
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// NAVBAR-MENU
const toggler = document.getElementById("nav-toggle");
const menuToggle = document.getElementById("nav-menu");
const close = document.getElementById("nav-close");

toggler.addEventListener("click", () => {
  menuToggle.style.bottom = 0;
});

close.addEventListener("click", () => {
  menuToggle.style.bottom = "-100%";
  menuToggle.style.transition = "all 0.4s ease-in-out";
});

// Active link
const sectoins = Array.from(document.querySelectorAll(".section"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    resetLinks();
    navLink.classList.add("active");
  });
});

function resetLinks() {
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
  });
}

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  sectoins.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
      document
        .querySelector('.nav-item .nav-link[href*="' + sectionId + '"]')
        .classList.add("active");
    } else {
      document
        .querySelector('.nav-item .nav-link[href*="' + sectionId + '"]')
        .classList.remove("active");
    }
  });
});

// Product card
const popupViews = Array.from(document.querySelectorAll(".popup_view"));
const popupBtns = Array.from(document.querySelectorAll(".product_popup_btn"));
const closeBtns = Array.from(document.querySelectorAll(".close_btn"));
const addToCartBtns = Array.from(document.querySelectorAll(".add_cart_btn"));

popupBtns.forEach((popupBtn, i) => {
  popupBtn.addEventListener("click", () => {
    popupViews[i].classList.add("active");
    window.addEventListener("click", (event) => {
      if (event.target === popupViews[i]) {
        popupViews[i].classList.remove("active");
      }
    });

    addToCartBtns.forEach((addToCartBtn) => {
      addToCartBtn.addEventListener("click", () => {
        popupViews.forEach((popupView) => {
          popupView.classList.remove("active");
        });
      });
    });
  });
});

closeBtns.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    popupViews.forEach((popupView) => {
      popupView.classList.remove("active");
    });
  });
});

// T-shirts gallery
const current = document.getElementById("featured");
const imgs = Array.from(document.querySelectorAll(".product_small_images"));

imgs.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    current.src = e.target.src;
  });
});

const currentWomen = document.getElementById("featured-2");
const womenImgs = Array.from(document.querySelectorAll(".women_images"));

womenImgs.forEach((womenImg) => {
  womenImg.addEventListener("mousemove", (e) => {
    currentWomen.src = e.target.src;
  });
});

const cartButtons = document.querySelectorAll(".product_btn");
cartButtons.forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    cartButton.classList.toggle("clicked");
  });
});

// Swiper
let swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    loop: true,
  },
});

// Animation
new WOW().init();

// Cart Shopping
const cartOpenBtns = Array.from(document.querySelectorAll(".primary-button"));
const cartMask = document.getElementById("cart-mask");
const cartCloseBtn = document.getElementById("cart-close");
const cartMain = document.getElementById("header-cart");

cartMain.addEventListener("click", () => {
  cartMask.classList.add("is-open");
  document.body.style.overflow = "hidden";
});

cartCloseBtn.addEventListener("click", () => {
  cartMask.classList.remove("is-open");
  document.body.style.overflow = "initial";
});

if (cartOpenBtns.length) {
  cartOpenBtns.forEach((cartOpenBtn) => {
    cartOpenBtn.addEventListener("click", () => {
      const cardItem = cartOpenBtn.closest(".card__item");
      const productInfo = {
        id: cardItem.dataset.id,
        src: cardItem.querySelector(".card__img").getAttribute("src"),
        title: cardItem.querySelector(".cardInItem-title").innerText,
        text: cardItem.querySelector(".cardInItem-text").innerText,
        price: cardItem.querySelector(".cardInItem-price").innerText,
      };

      const productCartHtml = `
				<div class="cardInItem" data-id="${productInfo.id}">
				<div class="cardInItem-img">
					<img src="${productInfo.src}" alt="">
				</div>
				<div class="cardInItem-content">
					<h2 class="cardInItem-title">${productInfo.title}</h2>
					<p class="cardInItem-text">${productInfo.text}</p>
						<input type="number" value="1">
					<span class="cardInItem-price">${productInfo.price}</span>
				</div>
			</div>
				`;

      cartMask.insertAdjacentHTML("beforeend", productCartHtml);

      cartMask.classList.add("is-open");
      document.body.style.overflow = "hidden";
      cartCloseBtn.addEventListener("click", () => {
        cartMask.classList.remove("is-open");
        document.body.style.overflow = "initial";
      });
    });
  });
}
