import { getFirestore, collection, addDoc, getDoc, getDocs, query, where, setDoc, doc, deleteDoc } from "firebase/firestore";
import { getStorage, getDownloadURL, uploadBytes, deleteObject, ref } from "firebase/storage";
import { getNewImage } from "../store/templates/elements";


export const createTemplate = async (info) => {
    const { uid, name, description } = info
    const template = {
        name,
        description,
        uid,
        createdAt: new Date().getTime(),
        exportCertificatesAs: "png",
        numberOfCertificates: 0,
        canvas: {
            items: [
                {
                    type: 'base-image',
                    x: 0,
                    y: 0,
                    id: makeid(12),
                    draggable: false,
                    type: "base-image",
                    name: "Base template image",
                    alt: "Example image",
                    storageRef: "default_template_images/base.jpg",
                    width: 1920,
                    height: 1080,
                    isConstant: true,
                },
                {
                    type: "text",
                    name: "Text field",
                    value: "Example text field",
                    x: 25,
                    y: 25,
                    fill: "#000",
                    attr: {
                        fontSize: 100,
                        fontFamily: "Roboto",
                    },
                    height: 200,
                    width: 800,
                    isConstant: false,
                },
            ],
        }
    }
    const db = getFirestore()
    const result = await addDoc(collection(db, 'templates'), template)
    return result
}

export const getTemplates = async (uid) => {
    const db = getFirestore()
    const result = await getDocs(collection(db, 'templates'), where('uid', '==', uid))
    console.log(result)
    let res = []
    result.forEach(template => {
        console.log(template.data().uid, "     ", uid)
        if (template.data().uid === uid) {
            let temp = {
                id: template.id,
                data: template.data()
            }
            res.push(temp)
        }
    })
    return res
}

export const editTemplateItems = async (id, items) => {
    console.log(id, items)
    const db = getFirestore()
    const docRef = doc(db, "templates", id)
    const docSnap = await getDoc(docRef)
    let itemss = items
    itemss.map(item => {
        if (item.type === "image" || item.type === "base-image") {
            item.src = "image"
        }
        if (item.type === "text") {
            item.attr.fontSize = parseInt(item.attr.fontSize) || 25
        }
    })
    console.log(docSnap.data())
    let template = {
        ...docSnap.data(),
        canvas: {
            ...docSnap.data().canvas,
            items: items,
        }
    }
    console.log(template)
    const result = await setDoc(doc(db, 'templates', id.toString()), template)
    return result
}

export const uploadImage = async (image, refs) => {
    //upload image to firebase storage
    const storage = getStorage()
    const imageRef = ref(storage, refs)
    const result = await uploadBytes(imageRef, image)
    console.log("Uploaded")
    return result
}

export const getURL = async (refs) => {
    const storage = getStorage()
    const imageRef = ref(storage, refs)
    const result = await getDownloadURL(imageRef)
    return result
}

export const deleteTemplate = async id => {
    await deleteDoc(doc(getFirestore(), "templates", id))
}

export const addImg = (width, height) => {
    return new Promise((resolve, reject) => {
        getDownloadURL(ref(getStorage(), 'default_template_images/image.jpg')).then(url => {
            let im = new window.Image()
            im.crossOrigin = 'anonymous'
            im.src = url
            im.onload = () => {
                const img = {
                    isConstant: false,
                    id: getNewImage().id,
                    name: "new image",
                    type: "image",
                    src: im,
                    draggable: true,
                    x: 100,
                    y: 100,
                    width,
                    height,
                    storageRef: "default_template_images/image.jpg",
                }
                resolve(img)
            }
        })
    })

}

export const getCertificates = async (uid) => {
    const db = getFirestore()
    const result = await getDocs(collection(db, 'certificates'), where('uid', '==', uid))
    let res = []
    result.forEach(cert => {
        if (cert.data().uid === uid) {
            let temp = {
                id: cert.id,
                data: cert.data()
            }
            res.push(temp)
        }
    })
    console.log(res)
    return res
}

export const getCertificateNames = async (uid) => {
    const db = getFirestore()
    const result = await getDocs(collection(db, 'templates'), where('uid', '==', uid))
    let res = []
    result.forEach(template => {
        if (template.data().uid === uid) {
            let temp = template.data().name
            res.push(template)
        }
    })
    console.log(res)
    return res
}

export const getTemplateById = async (templateId, uid) => {
    const db = getFirestore()
    const result = await getDoc(doc(db, 'templates', templateId))
    console.log(result)
    if (result) {
        if (result.data().uid !== uid) {
            return false
        }
    } else {
        return false
    }
    return { id: result.id, data: result.data() }
}

export const getTemplateByName = async (templateName, uid) => {
    const db = getFirestore()
    const results = await getDocs(collection(db, 'templates'), where("uid", '==', uid))
    let result = {}
    results.forEach(template => {
        if (template.data().name.toLowerCase().replace(/\s/g, '') === templateName) {
            result = { id: template.id, data: template.data() }
        }
    })
    return result
}

export const makeid = (length) => {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}

export const renameTemplate = async (id, name) => {
    let db = getFirestore()
    const templateRef = doc(db, 'templates', id)
    await setDoc(templateRef, { name: name }, { merge: true })
    return true
}