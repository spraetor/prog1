// The following code is extracted from https://github.com/whitead/dmol-book/blob/main/_static/custom.js
// which is licensed under the Attribution-NonCommercial 3.0 Unported license, see
// https://github.com/whitead/dmol-book/blob/main/LICENSE

function openModal(src, lastFocus) {
    let modal = document.querySelector('#wh-modal')
    modal.style.display = 'block'
    let modalContent = document.querySelector('#wh-modal-img')
    modalContent.src = src;
    let span = document.querySelector('#wh-modal-close')
    span.focus()
    modal.onclick = () => {
        modal.style.display = 'none'
        lastFocus.focus()
    }
    span.onclick = () => {
        modal.style.display = 'none'
        lastFocus.focus()
    }
}

function insertAnchors(element) {
    if (element.parentElement.tagName !== 'A') {
        const newButtonContainer = document.createElement('div')
        const newButton = document.createElement('button')
        newButtonContainer.appendChild(newButton)
        const p = element.parentElement
        element.parentElement.removeChild(element)
        newButton.appendChild(element)
        p.appendChild(newButtonContainer)
        newButton.onclick = () => openModal(element.getAttribute('src'), newButton)
        newButton.classList.add('wh-fig-a')
        newButton.classList.add('wh-venti-button')
        newButton.setAttribute('tabIndex', '0')
        newButtonContainer.classList.add('wh-flex-center')
    }
}

function addAlts(img) {
    // we overwrite because some weird alts show-up
    img.alt = 'Output image from code cell above'
}

function halfSize(img) {
    // we render at 200 dpi, so need to half the size of images
    // check if it's already modified
    if (!img.style.width) {
        img.style.width = img.naturalWidth / 2 + 'px'
        //img.style.height = img.naturalHeight / 2 + 'px'
    }
}

function addImgAnchors() {
    let figs = document.querySelectorAll('.figure img')
    figs.forEach(halfSize)
    figs.forEach(insertAnchors)
    let cellOutputs = document.querySelectorAll('.cell_output img')
    cellOutputs.forEach(halfSize)
    cellOutputs.forEach(addAlts)
    cellOutputs.forEach(insertAnchors)
}

window.addEventListener('load', addImgAnchors)