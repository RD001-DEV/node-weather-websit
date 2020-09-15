
const weatherForm = document.querySelector('form')
const search = document.querySelector('#inLoction')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $sendLocationButton = document.querySelector('#myLocation')


$sendLocationButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    } 

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        fetch('/weather?mylocation=' + latitude + ' ' + longitude).then((response) => {
            
            response.json().then((data) => {
                if (data.error){
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data[0].location
                    messageTwo.textContent = data[0].forecast
                } 
            })
        })
    })
})


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    search.value = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data[0].location
                messageTwo.textContent = data[0].forecast
            } 
        })
    })
})