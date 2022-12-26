// creating a container for monster data to go to//
const monsterContainer = document.querySelector('#monster-container')

// receiving buttons from html
const back = document.querySelector('#back')
const forward = document.querySelector('#forward')


// getting the form div from the html//
const formDiv = document.querySelector('#create-monster')

// creating the actual form in the div//
const form = document.createElement('form')
const nameInput = document.createElement('input')
const div = document.createElement('div')
const div2 = document.createElement('div')
const div3 = document.createElement('div')

nameInput.type = "text"
nameInput.id = "nameInput"
const ageInput = document.createElement('input')
ageInput.type = "text"
ageInput.id = "ageInput"
const formDescription = document.createElement('input')
formDescription.type = "text"
formDescription.id = "formDescription"
const submit = document.createElement('button')
submit.type = "submit"
submit.textContent = "submit"
form.append("input name", nameInput, div, "input age", ageInput, div2,  "input description", formDescription, div3, submit)
formDiv.append(form)



//////////////////////////////////////////////////////////////////////////
// getting monsters from json//
function getMonsters(page){
fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
.then(r=>r.json())
.then (monsterData => monsterData.forEach(monster => renderMonster(monster)))
}
pageIs()

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
////////////////////////////////////////
function pageIs(){
    let page = 1;
    forward.addEventListener('click',() => {
        removeAllChildNodes(monsterContainer)
        if(page>0){
            page +=1;
        }
        console.log(page);
    

        getMonsters(page);

    })
    ////////////////////////////////////////////////////////
    back.addEventListener('click', ()=>{
        removeAllChildNodes(monsterContainer)
        if(page>=2){
            page-=1
        }
    console.log(page);

    getMonsters(page)


    })
   
    console.log(page);
getMonsters(page)

}

//render monsters from json//
function renderMonster(monster){
    const monsterCard = document.createElement('div')
    const monsterName = document.createElement('h3')
    const monsterAge = document.createElement('h5')  
    const monsterDescription = document.createElement('p')

    monsterName.textContent=monster.name 
    monsterAge.textContent = `age ${parseInt(monster.age)}`
    monsterDescription.textContent = monster.description

    monsterCard.appendChild(monsterName)
    monsterName.append(monsterAge, monsterDescription)
    monsterContainer.append(monsterCard)
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    postMonster(e.target.nameInput.value,
    e.target.ageInput.value,
    e.target.formDescription.value)
})
function postMonster(name, age, description){
    fetch('http://localhost:3000/monsters',{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            "name": name,
            "age": age,
            "description": description
        })
    })
}












