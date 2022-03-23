// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
const btn = document.querySelector('.j-btn')

btn.addEventListener('click', () => {
   let width = window.screen.width;
   let height = window.screen.height;
   alert(`Размер вашего экрана ${width} х ${height}`);
})