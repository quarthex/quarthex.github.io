(() => {
    // etoso
    function uzi_etoson(hela) {
        const link = document.getElementById('etoso')
        link.href = `/${hela ? '' : 'mal'}hela.css`
        localStorage.setItem('hela', !!hela)
    }
    document.querySelector('.button.etoso')
        .addEventListener('click', () => uzi_etoson(localStorage.getItem('hela') !== 'true'))
    const match = matchMedia('(prefers-color-scheme: dark)')
    match.addEventListener('change', e => uzi_etoson(!e.matches))
    const hela = localStorage.getItem('hela') === 'true'
    uzi_etoson(hela !== false && (hela !== null || !match.matches))

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
        krei_fonto: (nodo, nomo, larĝo) => {
            const srcset = nodo.getAttribute(`fonto-${nomo}`)
            if (srcset) {
                const fonto = document.createElement('source')
                fonto.media = `(max-width:${larĝo}px)`
                fonto.srcset = srcset
                return fonto
            }
        },
        img: (nodo) => {
            if (nodo.tagName === 'PICTURE') return nodo
            const picture = document.createElement('picture')
            for (const fonto of [
                karuselo.krei_fonto(nodo, 'tablet', 1023),
                karuselo.krei_fonto(nodo, 'desktop', 1215),
                karuselo.krei_fonto(nodo, 'widescreen', 1407),
            ]) if (fonto) picture.appendChild(fonto)
            const img = document.createElement('img')
            img.src = nodo.getAttribute('fonto')
            img.alt = nodo.getAttribute('priskribo')
            img.width = 1920
            img.height = 1080
            picture.appendChild(img)
            return picture
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