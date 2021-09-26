import axios from 'axios'

export const loadFonts = async (sort) => {
    let url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBaX8tNR8l6g596VD30jXrb8sqcIay1OQg'
    url = `${url}&sort=${sort}`
    let res = await axios.get(url)
    return res.data.items
}

export const loadFontIntoCSS = async (fontFamily) => {
    try {
        let url = `https://fonts.googleapis.com/css?family=${fontFamily}`
        let style = document.createElement('link');
        style.href = url;
        style.rel = 'stylesheet';
        let style1 = document.createElement('link')
        style1.href = url
        style1.rel = 'preload'
        document.head.appendChild(style);
        document.head.appendChild(style1);
    }
    catch {
        console.log('font error')
    }
}
