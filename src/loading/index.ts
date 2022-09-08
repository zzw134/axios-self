function contentStyle(el: HTMLSpanElement, title: string, color: string) {
    el.textContent = title
    el.style.color = color
}
function createContent(title: string, color: string) {
    const span = document.createElement('span')
    span.className = 'zw-title'
    contentStyle(span, title, color)
    return span
}

function createDiv(title: string, color: string): HTMLDivElement {
    const div = document.createElement('div')
    div.className = 'zw-mask'
    const span = createContent(title, color)
    div.append(span)
    return div
}

export default function loading(title:string='加载中...', color:string='white'): {open: () => void, close: () => void} {
    const body = document.querySelector('body')
    const loadingDiv = createDiv(title, color)
    function open() {
        body?.append(loadingDiv)
    }
    function close() {
        console.log(111)
        loadingDiv.remove()
    }
    return {
        open,
        close
    }
}