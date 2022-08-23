import fs from 'fs-extra'
import axios from 'axios'
import { getImageSize } from './getImageSize.js'


const INITIAL_ID_XKCD_COMICS = 2000 
const MAX_ID_XKCD_COMICS = 2588

const {writeJSON} = fs

for (let id = INITIAL_ID_XKCD_COMICS; id < MAX_ID_XKCD_COMICS; id++){
    const url = `https://xkcd.com/${id}/info.0.json`
    const {data} = await axios.get(url)
    const {num, news, transcript, img, ...restOfComic} = data
    const {height, width} = await getImageSize({url: img})
    console.log(`[dimensions value] ===== ${width} *** ${width}`)
    const comicToStore = {
        id,
        img,
        width,
        height,
        ...restOfComic
    }

    await writeJSON(`./comics/${id}.json`, comicToStore)
    console.log(`[finish] ===== ./comics/${id}.json`)
}