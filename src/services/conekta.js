import axios from 'axios'
const script = document.createElement('script')
const conektaURL = ""

class Conekta{
  constructor(publicKey){
    this.publicKey = publicKey || "key_Ik4WxMhXctrriTvyfMAimyg"
    this.api;
    this.setInWindow();
  }

  setInWindow = () => {
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
    script.async = 1
    script.onload = () => {
      if (window.Conekta !== undefined) {
      window.Conekta.setPublishableKey(this.publicKey)
      this.api = window.Conekta
      }
    }

    script.onerror = () => {
      console.log('error')
      throw new Error('Error: Conekta script wasn\'t loaded.')
    }
    document.body.appendChild(script)

  }


  
}

export const makeOrder = (token, courseId)=>{
  const url = "https://us-central1-reactfirebase-b16aa.cloudfunctions.net/makeCharge"
  return axios.post(url, {
    token,
    courseId
  })
      .then(res=>{
        console.log(res)
        return res.data
      })
}




export default Conekta