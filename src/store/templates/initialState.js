import { getNewImage, getNewText, baseImage } from './elements'
const text = getNewText()
const image = getNewImage()
image['storageRef'] = 'default_template_images/image.jpg'
export const initialState = {
    userTemplates: [],
    currentTemplate: {
        id: null,
        canvas: {
            ratio: "default",
            imageRef: {
                baseImage: null,
                otherImages: []
            },
            stageRef: null,
            items: [baseImage, text],
            activeItem: text,
            fontsLoading: false,
        },
        downloadCurrentTemplate: false,
        isEditing: false,
    },
    fonts: [],
    doneSaving: false,
}
