export const readAsMarkdown = (url) =>{
    return new Promise((resolve, reject)=>{

        const reader = new FileReader()
        reader.onload = ()=>{
            return resolve(reader.result)
        }
        fetch(url)
        .then(r=>{
            return r.blob()
    
        })
        .then(file=>{
            const result = reader.readAsText(file)
            })

    })

}

export const convertToRawUrl = (url) => {
    let madeRaw ;
    madeRaw = url.split('/')
    madeRaw[2] = 'raw.githubusercontent.com'
    madeRaw.splice(5,1)
    madeRaw = madeRaw.join('/')
    return madeRaw
}