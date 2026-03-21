const idQuotes = document.querySelector('.ID')
const dice_btn = document.querySelector('button')
const quotes = document.querySelector('p')

dice_btn.addEventListener('click' , async ()=>{

    try{
        let getRequest = await fetch ("https://api.adviceslip.com/advice")
        let response = await  getRequest.json() 
        idQuotes.textContent = response["slip"]["id"]
        quotes.textContent = response["slip"]["advice"]
    }
    catch{
        console.error("Loading Failded")
    }
} )