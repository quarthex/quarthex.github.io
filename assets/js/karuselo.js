const div = document.querySelector('em-karuselo')

if (div) {
    const vico = []

    function krei_fonto(nodo, nomo, larĝo){
        const srcset = nodo.getAttribute(`fonto-${nomo}`)
        if (srcset) {
            const fonto = document.createElement('source')
            fonto.media = `(max-width:${larĝo}px)`
            fonto.srcset = srcset
            return fonto
        }
    }

    function img(nodo) {
        if (nodo.tagName === 'PICTURE') return nodo
        const picture = document.createElement('picture')
        for (const fonto of [
            krei_fonto(nodo, 'tablet', 1023),
            krei_fonto(nodo, 'desktop', 1215),
            krei_fonto(nodo, 'widescreen', 1407),
        ]) if (fonto) picture.appendChild(fonto)
        const img = document.createElement('img')
        img.src = nodo.getAttribute('fonto')
        img.alt = nodo.getAttribute('priskribo')
        img.width = 1920
        img.height = 1080
        picture.appendChild(img)
        return picture
    }

    function sekvi() {
        div.appendChild(img(vico.shift()))
        setTimeout(() => {
            vico.push(div.removeChild(div.firstChild))
            vico[0] = img(vico[0])
        }, 1000)
    }

    for (const bildo of div.querySelectorAll('em-bildo'))
        vico.push(div.removeChild(bildo))
    div.innerHTML = ''
    div.appendChild(img(vico.shift()))
    vico[0] = img(vico[0])
    window.addEventListener('load', () => setInterval(sekvi, 5000))
}