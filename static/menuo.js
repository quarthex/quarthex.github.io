(() => {
    const header = document.querySelector("header")
    const img = document.querySelector("header img")
    img.addEventListener("click", () => {
        if (header.getAttribute("class") === "fermita") {
            header.removeAttribute("class")
        } else {
            header.setAttribute("class", "fermita")
        }
    })
})()