document.addEventListener('DOMContentLoaded', () => {
    fetchDoges()
    let dogForm = document.getElementById('dog-form')

    dogForm.addEventListener('submit', (event) => {
        event.preventDefault()
        editDog(event.target)
    })
}) //end of DOMContentLoaded

function fetchDoges() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(dogs => renderDogs(dogs))
}

function renderDogs(dogs){
    const table = document.getElementById('table-body')
    dogs.forEach(dog => {
        let row = document.createElement('tr')
        row.id = dog.id
        row.innerHTML = `
            <td name="name">${dog.name}</td>
            <td name="breed">${dog.breed}</td>
            <td name="sex">${dog.sex}</td>
            <td>
                <button class="dog-btn" data-id="${dog.id}">Edit</button>
            </td>
            `
            table.append(row)
    })
    const dogBtns = Array.from(document.querySelectorAll(".dog-btn"))

    dogBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (event.target.dataset.id === btn.dataset.id){
                populateForm(btn.dataset.id)
            }
        })
    })
}


function populateForm(id){
    let dogForm = document.querySelector('#dog-form')

    let dog = document.getElementById(`${id}`)
    let name = dog.children['name'].innerText
    let breed = dog.children['breed'].innerText
    let sex = dog.children['sex'].innerText

    dogForm.children['name'].value = name
    dogForm.children['breed'].value = breed
    dogForm.children['sex'].value = sex

    dogForm.dataset.id = id

}

function editDog(dog){
    let id = dog.dataset.id

    let dogObject = {
        id: id,
        name: dog.name.value,
        breed: dog.breed.value,
        sex: dog.sex.value
    }
    
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify(dogObject)
    })

    let currentDog = document.getElementById(id)
    currentDog.children.name.textContent = dogObject.name
    currentDog.children.breed.textContent = dogObject.breed
    currentDog.children.sex.textContent = dogObject.sex
}