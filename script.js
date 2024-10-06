document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel");
  const indicatorContainer = document.querySelector(".indicators");
  let carouselCards = Array.from(document.querySelectorAll(".carousel-card"));
  const totalCards = carouselCards.length;

  const centerCardIndex = Math.floor(totalCards / 2);

  createIndicators();
  assignEventListeners();

  function createIndicators() {
    indicatorContainer.innerHTML = "";
    carouselCards.forEach(() => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      indicatorContainer.appendChild(indicator);
    });
    updateIndicators(centerCardIndex);
  }

  function updateIndicators(centerIndex) {
    const indicators = document.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === centerIndex);
    });
  }

  function assignEventListeners() {
    carouselCards.forEach((card) => {
      const newCard = card.cloneNode(true);
      card.parentNode.replaceChild(newCard, card);
    });

    carouselCards = Array.from(document.querySelectorAll(".carousel-card"));

    carouselCards.forEach((card, index) => {
      if (index >= totalCards - 3) {
        card.addEventListener("click", () => {
          moveCards("left");
        });
      } else if (index <= 2) {
        card.addEventListener("click", () => {
          moveCards("right");
        });
      }
    });
  }

  function moveCards(direction) {
    if (direction === "left") {
      const firstCard = carouselCards[0];

      const timeline = gsap.timeline({
        onComplete: () => {
          carouselContainer.appendChild(firstCard);
          carouselCards.push(carouselCards.shift());
          applyStyles(carouselCards);
          updateIndicators(centerCardIndex);
          assignEventListeners();
        },
      });

      carouselCards.forEach((card, i) => {
        const distance = -140;
        timeline.to(
          card,
          {
            x: distance,
            opacity: i === 0 ? 0 : 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0
        );
      });

      timeline.to(
        firstCard,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.5
      );
    } else if (direction === "right") {
      const lastCard = carouselCards[totalCards - 1];

      const timeline = gsap.timeline({
        onComplete: () => {
          carouselContainer.prepend(lastCard);
          carouselCards.unshift(carouselCards.pop());
          applyStyles(carouselCards);
          updateIndicators(centerCardIndex);
          assignEventListeners();
        },
      });

      carouselCards.forEach((card, i) => {
        const distance = 140;
        timeline.to(
          card,
          {
            x: distance,
            opacity: i === totalCards - 1 ? 0 : 1,
            duration: 0.5,
            ease: "power1.inOut",
          },
          0
        );
      });

      timeline.to(
        lastCard,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.5
      );
    }
  }

  function applyStyles(newOrder) {
    newOrder.forEach((card) => {
      gsap.set(card, { clearProps: "all" });
    });

    newOrder.forEach((card, i) => {
      if (i === 0 || i === 1 || i === 2) {
        gsap.to(card, {
          rotationY: 20,
          x: 0,
          duration: 0.1,
        });
      } else if (
        i === newOrder.length - 1 ||
        i === newOrder.length - 2 ||
        i === newOrder.length - 3
      ) {
        gsap.to(card, {
          rotationY: -20,
          x: 0,
          duration: 0.1,
        });
      } else {
        gsap.to(card, {
          rotationY: 0,
          x: 0,
          duration: 0.1,
        });
      }
    });
  }

  applyStyles(carouselCards);
});

// banner
const rings = document.querySelectorAll(".ring");
const titleElement = document.querySelector(".bannerh");
const priceElement = document.querySelector(".border-top.d-inline");
const descriptionElement = document.querySelector(".banner-perce");

rings.forEach((ring) => {
  ring.addEventListener("click", () => {
    const active = document.querySelector(".ring.center");
    if (ring === active) return;

    const clickedPosition = ring.classList.contains("left") ? "left" : "right";

    if (clickedPosition === "left") {
      moveLeftToCenter(ring, active);
    } else if (clickedPosition === "right") {
      moveRightToCenter(ring, active);
    }
  });
});

function getYPosition() {
  return window.innerWidth <= 768 ? "50px" : "100px";
}

function getXPosition(position) {
  if (window.innerWidth <= 768) {
    return position === "left"
      ? "-45vw"
      : position === "right"
      ? "25vw"
      : "-10vw";
  }
  return position === "left" ? "-39vw" : "39vw";
}

function getScale(position) {
  if (window.innerWidth <= 768) {
    return position === "center" ? 1.5 : 0.7;
  }
  return position === "center" ? 2.2 : 1;
}

function moveLeftToCenter(clickedRing, activeCenter) {
  const rightRing = document.querySelector(".ring.right");

  gsap.to(clickedRing, {
    scale: getScale("center"),
    x: "0vw",
    y: "0vh",
    rotate: 0,
    duration: 0.5,
    zIndex: 10,
  });

  fadeTextOut(() => {
    updateTextContent(clickedRing);
    fadeTextIn();
  });

  gsap.to(activeCenter, {
    scale: getScale("right"),
    x: getXPosition("right"),
    y: getYPosition(),
    rotate: 0,
    opacity: 0.8,
    duration: 0.5,
    zIndex: 5,
  });

  gsap.to(rightRing, {
    scale: getScale("left"),
    x: getXPosition("left"),
    y: getYPosition(),
    rotate: 0,
    opacity: 0.8,
    duration: 0.5,
    zIndex: 5,
  });

  clickedRing.classList.replace("left", "center");
  activeCenter.classList.replace("center", "right");
  rightRing.classList.replace("right", "left");
}

function moveRightToCenter(clickedRing, activeCenter) {
  const leftRing = document.querySelector(".ring.left");

  gsap.to(clickedRing, {
    scale: getScale("center"),
    x: "0vw",
    y: "0vh",
    rotate: 0,
    duration: 0.5,
    zIndex: 10,
  });

  fadeTextOut(() => {
    updateTextContent(clickedRing);
    fadeTextIn();
  });

  gsap.to(activeCenter, {
    scale: getScale("left"),
    x: getXPosition("left"),
    y: getYPosition(),
    rotate: 0,
    opacity: 0.8,
    duration: 0.5,
    zIndex: 5,
  });

  gsap.to(leftRing, {
    scale: getScale("right"),
    x: getXPosition("right"),
    y: getYPosition(),
    rotate: 0,
    opacity: 0.8,
    duration: 0.5,
    zIndex: 5,
  });

  clickedRing.classList.replace("right", "center");
  activeCenter.classList.replace("center", "left");
  leftRing.classList.replace("left", "right");
}

function fadeTextOut(callback) {
  gsap.to([titleElement, priceElement, descriptionElement], {
    opacity: 0,
    duration: 0.2,
    onComplete: callback,
  });
}

function fadeTextIn() {
  gsap.to([titleElement, priceElement, descriptionElement], {
    opacity: 1,
    duration: 0.2,
  });
}

function updateTextContent(clickedRing) {
  titleElement.textContent = clickedRing.getAttribute("data-title");
  priceElement.textContent = clickedRing.getAttribute("data-price");
  descriptionElement.textContent = clickedRing.getAttribute("data-description");
}
