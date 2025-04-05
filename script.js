document.addEventListener('DOMContentLoaded', () => {
    const yachtsContainer = document.getElementById('yachts-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const yachts = [
        {
            id: 1,
            title: "Arrow",
            category: "LUXURY YAHTS",
            length: "48m(155ft)",
            builder: "Admiral",
            built: "2021",
            guests: "11 in 5 cabins",
            price: "€33,500,000",
            image: "./src/img/about-yahts/Arrow.png"
        },
        {
            id: 2,
            title: "BENETTI OASIS 40M...",
            category: "LUXURY YAHTS",
            length: "41m (133ft)",
            builder: "Benetti",
            built: "2025",
            guests: "10 in 5 cabins",
            price: "€23,210,000",
            image: "./src/img/about-yahts/BENETTI-OASIS-40M-BO122.png"
        },
        {
            id: 3,
            title: "BELLE ANNA",
            category: "LUXURY YAHTS",
            length: "50m(155ft) ",
            builder: "ISA",
            built: "2012",
            guests: "12 in 6 cabins",
            price: "€21,000,000",
            image: "./src/img/about-yahts/BELLE-ANNA.png"
        },
        {
            id: 4,
            title: "Ellen",
            category: "LUXURY YAHTS",
            length: "40m (132ft)",
            builder: "Perini Navi",
            built: "2001 / 2016 (refitted)",
            guests: "9 in 4 cabins",
            price: "€9,300,000",
            image: "./src/img/about-yahts/Ellen.png"
        }
        ,
        {
            id: 5,
            title: "MIRAGE 401",
            category: "LUXURY YAHTS",
            length: "38m (125ft)",
            builder: "Gianetti Custom Yachts",
            built: "2024",
            guests: "10 in 5 cabins",
            price: "€13,500,000",
            image: "./src/img/about-yahts/MIRAGE-401.png"
        }
        ,
        {
            id: 6,
            title: "KING",
            category: "LUXURY YAHTS",
            length: "33m (109ft)",
            builder: "Overmarine",
            built: "2004 / 2018 (refitted)",
            guests: "9 in 4 cabins",
            price: "€1,850,000",
            image: "./src/img/about-yahts/KING.png"
        }
        ,
        {
            id: 7,
            title: "SALT",
            category: "LUXURY YAHTS",
            length: "32m (105ft)",
            builder: "SanLorenzo",
            built: "2019",
            guests: "11 in 5 cabins",
            price: "€7,800,000",
            image: "./src/img/about-yahts/SALT.png"
        }
        ,
        {
            id: 8,
            title: "STORM",
            category: "LUXURY YAHTS",
            length: "32m (103ft)",
            builder: "Overmarine",
            built: "2005 / 2022 (refitted)",
            guests: "9 in 4 cabins",
            price: "€2,900,000",
            image: "./src/img/about-yahts/STORM.png"
        }
        ,
        {
            id: 9,
            title: "COLLU",
            category: "LUXURY YAHTS",
            length: "29m (96ft)",
            builder: "Ferretti",
            built: "2014",
            guests: "10 in 5 cabins",
            price: "$4,300,000",
            image: "./src/img/about-yahts/COLLU.png"
        }
    ];

    let currentPage = 0;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(yachts.length / itemsPerPage);
    let direction = 'right'; 

    function displayYachts() {
        const cards = yachtsContainer.querySelectorAll('.yacht-card');
        cards.forEach(card => {
            card.classList.add(direction === 'right' ? 'fade-out-left' : 'fade-out-right');
        });

        setTimeout(() => {
            yachtsContainer.innerHTML = '';
            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;
            const pageYachts = yachts.slice(start, end);

            pageYachts.forEach(yacht => {
                const yachtCard = document.createElement('div');
                yachtCard.classList.add('yacht-card');
                yachtCard.classList.add(direction === 'right' ? 'fade-in-left' : 'fade-in-right');
                yachtCard.innerHTML = `
                    <img src="${yacht.image}" alt="${yacht.title}" class="yaht-foto">
                    <h2 class="yaht-name">${yacht.title}</h2>
                    <p class="yaht-category">${yacht.category}</p>
                    <div class="informations">
                        <div class="information"><p class="data">LENGTH</p> <p>${yacht.length}</p></div>
                        <div class="information"><p class="data">BUILDER</p> <p>${yacht.builder}</p></div>
                        <div class="information"><p class="data">BUILT</p> <p>${yacht.built}</p></div>
                        <div class="information"><p class="data">GUESTS</p> <p>${yacht.guests}</p></div>
                        <div class="information"><p class="data">PRICE</p> <p>${yacht.price}</p></div>
                    </div>
                `;
                yachtsContainer.appendChild(yachtCard);
            });

            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }, 100); 
    }

    displayYachts();

    prevBtn.addEventListener('click', () => {
        direction = 'left'; 
        currentPage--;
        if (currentPage < 0) {
            currentPage = totalPages - 1; 
        }
        displayYachts();
    });

    nextBtn.addEventListener('click', () => {
        direction = 'right'; 
        currentPage++;
        if (currentPage >= totalPages) {
            currentPage = 0; 
        }
        displayYachts();
    });
});


  function isBright(r, g, b) {
    return (r + g + b) / 3 > 230;
  }

  function analyzeImageEdges(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const edgeWidth = 10;
    const height = canvas.height;

    let leftBright = 0, rightBright = 0;
    for (let y = 0; y < height; y += 5) {
      for (let x = 0; x < edgeWidth; x++) {
        const i = (y * canvas.width + x) * 4;
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
        if (isBright(r, g, b)) leftBright++;
      }
      for (let x = canvas.width - edgeWidth; x < canvas.width; x++) {
        const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
        if (isBright(r, g, b)) rightBright++;
      }
    }

    const threshold = 100; // налаштовуй
    if (leftBright > threshold) document.body.classList.add('shadow-left');
    if (rightBright > threshold) document.body.classList.add('shadow-right');
  }

  window.addEventListener('load', () => {
    const img = document.querySelector('body img'); // або фон, якщо img
    if (img.complete) analyzeImageEdges(img);
    else img.onload = () => analyzeImageEdges(img);
  });