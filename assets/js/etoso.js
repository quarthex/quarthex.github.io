function uzi_etoson(hela) {
    document.querySelector('link.hela').disabled = !hela
    document.querySelector('link.malhela').disabled = hela
    localStorage.setItem('hela', !!hela)
}
document.querySelector('.button.etoso')
    .addEventListener('click', () => uzi_etoson(localStorage.getItem('hela') !== 'true'))
const match = matchMedia('(prefers-color-scheme: dark)')
match.addEventListener('change', e => uzi_etoson(!e.matches))
const hela = localStorage.getItem('hela') === 'true'
uzi_etoson(hela !== false && (hela !== null || !match.matches))