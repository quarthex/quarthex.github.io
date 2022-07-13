(() => {
    // etoso
    function uzi_etoson(etoso) {
        const link = document.getElementById('etoso')
        link.href = `/${etoso}.css`
        localStorage.setItem('etoso', etoso)

    }
    document.getElementById('hela').onclick = () => uzi_etoson('malhela')
    document.getElementById('malhela').onclick = () => uzi_etoson('hela')
    const match = matchMedia('(prefers-color-scheme: dark)')
    match.addEventListener('change', e => uzi_etoson(e.matches ? 'malhela' : 'hela'))
    const etoso = localStorage.getItem('etoso')
    uzi_etoson(etoso === 'malhela' || (etoso === null && match.matches) ? 'malhela' : 'hela')

    // menuo
    const burger = document.querySelector('.navbar-burger')
    const target = document.getElementById(burger.dataset.target)
    burger.onclick = function () {
        burger.classList.toggle('is-active')
        target.classList.toggle('is-active')
    }

    // karuselo
    const karuselo = {
        div: document.querySelector('em-karuselo'),
        vico: [],
        img: (nodo) => {
            if (nodo.tagName === 'IMG') return nodo
            const img = document.createElement('img')
            img.src = nodo.getAttribute('fonto')
            img.alt = nodo.getAttribute('priskribo')
            img.width = 1920
            img.height = 1080
            return img
        },
        sekvi: () => {
            karuselo.div.appendChild(karuselo.img(karuselo.vico.shift()))
            setTimeout(() => {
                karuselo.vico.push(karuselo.div.removeChild(karuselo.div.firstChild))
                karuselo.vico[0] = karuselo.img(karuselo.vico[0])
            }, 1000)
        }
    }
    for (const bildo of karuselo.div.querySelectorAll('em-bildo'))
        karuselo.vico.push(karuselo.div.removeChild(bildo))
    karuselo.div.innerHTML = ''
    karuselo.div.appendChild(karuselo.img(karuselo.vico.shift()))
    karuselo.vico[0] = karuselo.img(karuselo.vico[0])
    window.addEventListener('load', () => setInterval(karuselo.sekvi, 5000))
})()