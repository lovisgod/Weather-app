console.log('client side javascript file is loaded')

const getWeather =(address) => {fetch('http://localhost:3000/get-weather?address='+address).then((response) => {
    response.json().then((data) => {
        if (data.err){
            doc1.textContent = data.err;
        }else {
            doc1.textContent= data.Location_name;
            doc2.textContent = data.forecast;
        }
    })
}) 
}   



//this is where we access the form div  
const weartherForm = document.querySelector('form')
//here we access the input element in the form div
const searchElement = document.querySelector('input')
const doc1 = document.querySelector('#p1');
const doc2 = document.querySelector('#p2');

// doc1.textContent = 'HELLO WORD'
// doc2.textContent = 'HELLO AFRICA'
//here we clear the values in the search form when we reload the page 
searchElement.value= '';
weartherForm.addEventListener('submit', (e) => {
    //this prevent the clicking of button from reloading the page by default
    e.preventDefault();
    //this gets the value of what was inputed into the form
    const locationInput = searchElement.value;
    doc1.textContent = 'Loading......'
    doc2.textContent = '';
    getWeather(locationInput);
})