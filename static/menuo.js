(() => {
    const burger = document.querySelector('.navbar-burger')
    const target = document.getElementById(burger.dataset.target)
    burger.onclick = function () {
        burger.classList.toggle('is-active')
        target.classList.toggle('is-active')
    }
})()
