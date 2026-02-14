const dateDay = document.querySelector('#days')
const body = document.querySelector('body')
const cardList = document.querySelectorAll('.card')
const dialog = document.querySelector('dialog')
const cards = [
    {image:'./heart-solid-full.svg' , title:"Open when you're sad" , message:"My love, I know sometimes the world feels heavy. But remember, you are the strongest person I know. Your smile lights up my entire world, and I promise that no matter what, I'm here for you. Let me be your safe place. I love you more than words can express. 💕"  },
    {image:'./comment-regular-full.svg' , title:"Open when you miss me" , message:"I miss you too, beautiful. Even when we're apart, you're always in my thoughts. Close your eyes and imagine my arms around you, holding you tight. Distance means nothing when someone means everything. I can't wait until I can hold you again. 🥰"  },
    {image:'./star-regular-full.svg' , title:"Open when you need motivation" , message:"You are absolutely incredible! Look at everything you've accomplished. I believe in you with all my heart. You have the power to achieve anything you set your mind to. Keep going, my love. I'm so proud of you, and I'm cheering for you every step of the way! 💪✨"  },
    {image:'./face-smile-regular-full.svg' , title:"Open when you want to smile" , message:"Remember that time we laughed until our stomachs hurt? Or when we danced in the kitchen at midnight? You make every moment magical. Your laugh is my favorite sound in the world. Keep smiling, beautiful, because your happiness is everything to me. 😊💖"  },
]
/* Return date time */
function calculateDateTogether()
{
  const startDate = new Date('2026-01-14');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
}

let time = calculateDateTogether()
let count = 0

let interval = setInterval(() => {
    if (count < time) {
        count += 1
        dateDay.textContent = count
    } else {
        clearInterval(interval)
    }
}, 100)

Array.from(cards).forEach(
    (card, index) =>{
    let emoji = card["image"]
    let title = card["title"]
    let message = card["message"]
    cardList[index].addEventListener('click',()=>{
        dialog.innerHTML= `
        <img src="${emoji}" alt="" class="size-10 mx-auto"><br>
        <h1 class="text-3xl font-semibold">${title}</h1><br>
        <p class="text-justify text-gray-500">${message}</p>
        <button class="bg-pink-500 text-white rounded-full py-4">Close</button>
   `
        dialog.showModal()
        const dialog_btn = document.querySelector('dialog[open] button')
dialog_btn.addEventListener('click', ()=>{
    dialog.close()})
    })
})

