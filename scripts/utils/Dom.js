export class Dom {
    static createElement(tag, className = '', attrs = {}) {
        const el = document.createElement(tag)
        if(className) el.className = className
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
        return el
    }
    static append (parent, children) {
        children.filter(Boolean).forEach(child => parent.append(children))
    }   
}