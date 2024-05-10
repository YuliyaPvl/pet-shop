const items = [
  {
    name: 'Корм для кошек',
    image: 'https://gavrik.by/image/cache/catalog/04.04.2023/ambrosia/kitten3485-800x800.png',
    price: 800,
    tags: ['Кошки', 'Еда'],
    description: 'Сбалансированный рацион для вашего любимца',
    rating: 4.5,
  },
  {
    name: 'Игрушка для собак',
    image: 'https://img.joomcdn.net/a0a62cadaeb522c0c6b8842b3e105f9d96ebe820_1024_1024.jpeg',
    price: 500,
    tags: ['Собаки', 'Игрушки'],
    description: 'Забавная игрушка для активного времяпрепровождения',
    rating: 4.2,
  },
  {
    name: 'Лежанка для грызунов',    
    image: 'https://ir.ozone.ru/s3/multimedia-t/c1000/6383960549.jpg',
    price: 350,
    tags: ['Грызуны', 'Кроватки'],
    description: 'Удобная и мягкая лежанка для вашего питомца',
    rating: 4.0,
  },
  {
    name: 'Корм для рыб',    
    image: 'https://zoomama.by/upload/iblock/819/tetra_rubin_hlopya_12_g.jpg',
    price: 330,
    tags: ['Рыбы', 'Корм'],
    description: 'Сбалансированный корм-хлопья для всех золотых рыбок и других холоднокровных рыб',
    rating: 4.7,
  },
  {
    name: 'Клетка для птицы',    
    image: 'https://m.mirkorma.ru/upload/medialibrary/f39/f395cee11a2f45a23e7d4acb3425ceff.jpg',
    price: 2000,
    tags: ['Птицы', 'Клетка'],
    description: 'Из металла золотого цвета, основание – из цветной пластмассы',
    rating: 4.1,
  },
  {
    name: 'Защита от блох и клещей',    
    image: 'https://vetapteki.by/wp-content/uploads/prod/2021/08/G000100398_2.jpg?v=1628292683',
    price: 1000,
    tags: ['Собака', 'Таблетки'],
    description: 'Инсектоакарицидный препарат системного действия.',
    rating: 4.9,
  },
  {
    name: 'Когтеточка',    
    image: 'https://ir.ozone.ru/s3/multimedia-m/c1000/6051163906.jpg',
    price: 900,
    tags: ['Кошка', 'Когтеточка'],
    description: 'Когтеточка сизалевая 77 см',
    rating: 4.5,
  },
  {
    name: 'Фурминатор для собак с короткой шерстью',    
    image: 'https://zoofauna.by/images/stories/virtuemart/product/FURminator6.jpg',
    price: 410,
    tags: ['Собака', 'Расческа'],
    description: 'Фурминатор средний для короткошерстных собак.',
    rating: 4.2,
  },
  
];

const template = document.getElementById('item-template');
const shopItems = document.getElementById('shop-items');
const filterSort = document.getElementById('sort');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const nothingFound = document.getElementById('nothing-found');

function renderItems(itemsToRender) {
  shopItems.innerHTML = '';
  if (itemsToRender.length > 0) {
    nothingFound.style.display = 'none';
    itemsToRender.forEach(item => {
      const instance = template.content.cloneNode(true);
      instance.querySelector('img').src = item.image;
      instance.querySelector('h1').innerText = item.name;
      instance.querySelector('p').innerText = item.description;
      instance.querySelector('.price').innerText = `${item.price}₽`;
      for (const tag of item.tags) {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.innerText = tag;
        instance.querySelector('.tags').appendChild(tagSpan);
      }
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        if (i < item.rating) {
          star.classList.add('rated');
        }
        instance.querySelector('.rating').appendChild(star);
      }
      shopItems.appendChild(instance);
    });
  } else {
    nothingFound.style.display = 'block';
  }
}

function applySort(itemsToSort) {
  const sortValue = filterSort.value;
  if (sortValue === 'alphabet') {
    itemsToSort.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === 'expensive') {
    itemsToSort.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'cheap') {
    itemsToSort.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'rating') {
    itemsToSort.sort((a, b) => b.rating - a.rating);
  }
}

function searchItems() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = items.filter(item => {
    return item.name.toLowerCase().includes(searchTerm) ||
           item.description.toLowerCase().includes(searchTerm) ||
           item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
  });
  applySort(filteredItems);
  renderItems(filteredItems);
}

filterSort.addEventListener('change', () => {
  searchItems();
});

searchBtn.addEventListener('click', () => {
  searchItems();
});

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    searchItems();
  }
});

renderItems(items);