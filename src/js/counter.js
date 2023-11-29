// компонент степпер
const counter = document.querySelector('.counter') // Обертка компонента
const counterInput = document.querySelector('.counter__input') // текстовый инпут
const counterBtnUp = document.querySelector('.counter__btn--up') // Кнопка Увеличить
const counterBtnDown = document.querySelector('.counter__btn--down') // Кнопка Уменьшить

let COUNT = Number.parseInt(counterInput.value, 10)

// Функция увеличения
counterBtnUp.addEventListener('click', () => {
  COUNT++

  if (COUNT === 1) {
    counterBtnDown.setAttribute('disabled', '')
  } else {
    counterBtnDown.removeAttribute('disabled', '')
  }

  if (COUNT === 10) {
    counterBtnUp.setAttribute('disabled', '')
  } else {
    counterBtnUp.removeAttribute('disabled', '')
  }

  counterInput.value = COUNT
})

// Функция уменьшения
counterBtnDown.addEventListener('click', () => {
  COUNT--

  if (COUNT === 1) {
    counterBtnDown.setAttribute('disabled', '')
  } else {
    counterBtnDown.removeAttribute('disabled', '')
  }

  // if (COUNT === 10) {
  //   counterBtnUp.setAttribute('disabled', '')
  // } else {
  //   counterBtnUp.removeAttribute('disabled', '')
  // }

  counterInput.value = COUNT
})
