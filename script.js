// At first Get all elements by their ID....

let username = document.getElementById('username');
let password = document.getElementById('password')
let loginBtn = document.getElementById('login-btn')
let loginPage = document.getElementById('login-page')
let allElements = document.getElementById('all-elements')
let searchInput = document.getElementById('search-input')
let searchBtn = document.getElementById('search-btn')
let cardsContainer = document.getElementById('cards-container');
let issueCount = document.getElementById('issue-count')
let spinner = document.getElementById('spinner')
let allData = document.getElementById('all-data')
let openData = document.getElementById('open-data')
let closeData = document.getElementById('close-data')
let modal = document.getElementById('modal')


let heading = document.getElementById('heading');
let sts = document.getElementById('status');
let open = document.getElementById('open');
let date = document.getElementById('date');
let bug = document.getElementById('bug');
let help = document.getElementById('help');
let para = document.getElementById('para');
let assign = document.getElementById('assign');
let names = document.getElementById('name');
let priority = document.getElementById('priority');
let quality = document.getElementById('quality');






// login form 


loginBtn.addEventListener('click', function () {
    if (username.value === 'admin' && password.value === 'admin123') {
        loginPage.classList.add('hidden')
        allElements.classList.remove('hidden')
    }
    else {
        alert('Invalid Information')
    }
})




// function for load all data

const loadData = () => {
    spinner.classList.remove('hidden')
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            displayData(data.data)
            spinner.classList.add('hidden')
        })

}
loadData()


// function for display all data
const displayData = (data) => {
  cardsContainer.innerHTML = ''
    data.forEach(element => {
        let lbl = ''
        element.labels.forEach(label => {
            lbl += `<span class="bg-amber-50 p-1">${label}</span>`
        })

        let card = document.createElement('div')
        card.className = "card max-w-[400px] space-y-3 p-3 bg-white "
        card.onclick = () => openModal(element.title)
        card.innerHTML = `
     <p class="text-right" id="p">${element.priority}</p> 
                <h1 class="text-2xl min-h-[70px]">${element.title}</h1>
               <p class="line-clamp-2">${element.description}</p>
               <div class="flex gap-2 ">
                   
                ${lbl}
               </div>
                <hr class="text-gray-200">
                 <p>${element.author}</p>
                 <p>${element.createdAt}</p>
    
    `

        if (element.status === 'open') {
            card.classList.add('border-t-2', 'border-t-green-600')
        }
        if (element.status === 'closed') {
            card.classList.add('border-t-2', 'border-t-purple-600')
        }
        // issues for data
        cardsContainer.appendChild(card)
        issueCount.innerText = cardsContainer.children.length




    });


}





const loadOpenData = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => displayOpenData(data.data))
}



// function for load closed data

const loadClosedData = () => {

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => displayClosedData(data.data))
}

// function for display closed data

const displayClosedData = (data) => {
    cardsContainer.innerHTML = ''
    data.forEach(element => {
        if (element.status === 'closed') {
            let lbl = ''
            element.labels.forEach(label => {
                lbl += `<span class="bg-amber-50 p-1">${label}</span>`
            })

            let card = document.createElement('div')
            card.onclick = () => openModal(element.title)
            card.className = "card max-w-[400px] space-y-3 p-3 bg-white "
            card.innerHTML = `
     <p class="text-right">${element.priority}</p>
                <h1 class="text-2xl min-h-[70px]">${element.title}</h1>
               <p class="line-clamp-2">${element.description}</p>
               <div class="flex gap-2 ">
                   
                ${lbl}
               </div>
                <hr>
                 <p>${element.author}</p>
                 <p>${element.createdAt}</p>
    
    `

            
            cardsContainer.appendChild(card)
            issueCount.innerText = cardsContainer.children.length

            if (element.status === 'closed') {
                card.classList.add('border-t-2', 'border-t-purple-600')
            }

        }

    });


}

