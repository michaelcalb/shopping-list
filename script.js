let total = 0
let itemArray = []
let id = 1

let enablePrice = document.getElementById('enablePrice')
let priceDisplayClass =  document.getElementsByClassName('priceDisplay')
let listItemClass = document.getElementsByClassName('listItem')

let listEl = document.getElementById('list')
let totalEl = document.getElementById('total')

function resetInputs() {

    document.getElementById('item').value = ``
    document.getElementById('quantity').value = ``
    document.getElementById('price').value = ``
}

function priceDisplay() {

    if (!enablePrice.checked) {
        for(let num=0; num<priceDisplayClass.length; num++) {
            priceDisplayClass[num].style.display = 'none'
            document.getElementById('price').style.display = 'none'
        }

    } else {
        for(let num=0; num<priceDisplayClass.length; num++) {
            priceDisplayClass[num].style.display = 'block'
            document.getElementById('price').style.display = 'inline-block'
        }
    }
}

function checkTableContent () {
    if (document.getElementsByTagName('tr').length == 1) {
        listEl.style.display = 'none'
        totalEl.innerHTML = ''
        itemArray = []
        total = 0
        id = 1
    }
}

function addToList() {

    let item = {
        name: document.getElementById('item').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    }

    if (item.name.length == 0 || enablePrice.checked && isNaN(item.price) || isNaN(item.quantity)) {
        alert('Please, verify your inputs and try again.')
        return
    }

    for(num=0; num<itemArray.length; num++) {
        if (item.name == itemArray[num].name) {
            alert('The item already exists.')
            return
        }
    }

    if (!enablePrice.checked) {
        item.price = 0
    }

    itemArray.push(item)

    listEl.innerHTML += `<tr class="listItem"><td>${item.name}</td><td class="priceDisplay">${item.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td><td>${item.quantity}</td><td class="priceDisplay">${(item.quantity*item.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td><td><input type="button" value="Delete" onclick="deleteItem(${id})"></td></tr>`

    id++

    total += item.quantity*item.price

    totalEl.innerHTML = `Total: ${total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`

    listEl.style.display = 'table'

    checkTableContent()
    resetInputs()
    priceDisplay()
}

function clearList() {

    for (num=0; num<document.getElementsByClassName('listItem').length || num == 1; document.getElementsByClassName('listItem')[num].remove()) {

        if (document.getElementsByClassName('listItem').length == 0) {
            break
        }  
    }
    
    checkTableContent()
    resetInputs()
}

function deleteItem(id) {

    for (num=0; num<itemArray.length; num++) {

        if (document.getElementsByTagName('tr')[id].getElementsByTagName('td')[0] == itemArray[num].name) {
            itemArray.splice(num, 1)
        }
    }

    document.getElementsByTagName('tr')[id].remove()

    total -= itemArray[id-1].price*itemArray[id-1].quantity

    totalEl.innerHTML = `Total: ${total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`

    checkTableContent()
    priceDisplay()
}

// yes i know this code is garbage but im too lazy to optimize this sorry