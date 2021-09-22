

export const getNewText = (type) => {
    let text = {
        id: makeid(15),
        isConstant: true,
        type: "text",
        name: "Text field",
        value: "Example text field",
        fill: "#000",
        x: 50,
        y: 50,
        attr: {
            fontSize: 75,
            fontFamily: 'Roboto',
        },
        width: 800,
        height: 120,
    }
    return text
}

export const getNewImage = () => {
    let image = {
        isConstant: false,
        id: makeid(15),
        type: "image",
        name: "image",
        x: 10,
        y: 10,
        scale: 1,
        draggable: true,
    }
    return image
}

export const baseImage = {
    id: 'baseImage',
    type: "base-image",
    name: "Base template image",
    src: "default",
}


const makeid = (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}