(() => {
    function uzi_etoson(etoso) {
        const html = document.querySelector('html')
        html.dataset['etoso'] = etoso
        localStorage.setItem('etoso', etoso)
    }
    document.getElementById('hela').onclick = () => uzi_etoson('malhela')
    document.getElementById('malhela').onclick = () => uzi_etoson('hela')
    const match = matchMedia('(prefers-color-scheme: dark)')
    match.addEventListener('change', e => uzi_etoson(e.matches ? 'malhela' : 'hela'))
    const etoso = localStorage.getItem('etoso')
    uzi_etoson(etoso === 'malhela' || (etoso === null && match.matches) ? 'malhela' : 'hela')
})()