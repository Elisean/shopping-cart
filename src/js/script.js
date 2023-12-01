import { Sidebar } from './components/sidebar'

// первый параметр - сайдбар,
// второй - кнопка по клику на которую открывается сайдбар,
// третий положение сайдбара (если не передан, то по умолчанию 'left'
const panel = new Sidebar('#sidebar', '#open-basket', 'right')
const form = document.querySelector('#productForm')
const productList = document.querySelector('.products-list') // контейнер для отрисовки товаров на главной странице

// Функция для инициализации основных функций и т.д.
const init = async () => {
  window.addEventListener('DOMContentLoaded', async () => {
    await loadJSON() // функция загрузки данных

    // Обработка данных формы
    form.addEventListener('submit', (e) => {
      e.preventDefault() // иначе форма отправится синхронно. Это приведет к перезапуску страницы, а значит, метод addProduct не успеет выполниться.
      addProduct()
    })
    await purchaseProduct()
    // productList.addEventListener('click', purchaseProduct) // добавление товара в корзину ?
  })
}

init()

// Функция подгрузки данных на главную страницу
async function loadJSON() {
  let html = ''

  try {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()

    console.log('data', data)

    if (data && Array.isArray(data)) {
      data.forEach((product) => {
        html += `
            <div class="main-card" data-card-id=${product?.id}>
              <div class="card-image">
                <img src="${product?.imgSrc}" alt="image">

                <div class="card-wishlist">
                  <div class="wishlist-rating">

                    <div class="rating-img">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 6.12414H9.89333L8 0L6.10667 6.12414H0L4.93333 9.90345L3.06667 16L8 12.2207L12.9333 16L11.04 9.87586L16 6.12414Z"
                          fill="#FFCE31" />
                      </svg>
                    </div>

                    <span class="rating-amount">${product?.rating}</span>
                  </div>

                  <svg class="whishlist-heart" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z">
                    </path>
                  </svg>
                </div>
              </div>

              <h3 class="card-name">${product?.name}</h3>

              <p class="card-category">${product?.category}</p>

              <p class="card-price">${product?.price}</p>

              <button class="btn btn-primary">Add to cart</button>
            </div>
          `
      })
    }
    productList.insertAdjacentHTML('beforeend', html)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

// Функция создания товара через форму
const addProduct = async () => {
  const productData = {} // отдельная сущность товара

  // собираем данные из формы
  Array.from(form?.elements).forEach((element) => {
    if (element?.name) {
      productData[element?.name] = element?.value
    }
  })

  try {
    const response = await fetch(' http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    if (response.ok) {
      console.log('Product added successfully!')
      form.reset()
      loadJSON() // показываем актуальные данные
    } else {
      console.log('Error to add product.')
    }
  } catch (error) {
    console.error('Error', error)
  }
}

// Функция добавления товара в корзину
function purchaseProduct() {
  const cards = document.querySelectorAll('.main-card') // получаем все карточки

  cards.forEach((card) => {
    card.addEventListener('click', () => getProductInfo(card))
  })
}

// Функция извлечения данных из карточки на главной странице
function getProductInfo(product) {
  const productInfo = {
    id: product?.querySelector('.main-card')?.dataset?.сardId ?? '',
    imgSrc: product?.querySelector('.card-image img')?.src ?? '',
    name: product?.querySelector('.card-name')?.textContent ?? '',
    category: product?.querySelector('.card-category')?.textContent ?? '',
    price: product?.querySelector('.card-price')?.textContent ?? '',
  }

  addProductsToBasketList(productInfo)
}

function addProductsToBasketList(basketItem) {
  console.log(basketItem)

  // рисуем данные с сайдбаре
}
