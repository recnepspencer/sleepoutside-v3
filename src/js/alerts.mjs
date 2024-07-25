// here is an example alert that could be added to the list in alerts.json
// background is optional (defaults to white)
// {
//     "message":"I am a test!",
//     "background":"var(--secondary-color)",
//     "color":"white"
// }

async function generateAlerts(){
    let shouldGenerate = true

    // used code from ./productData.mjs
    const fetched = await fetch("/json/alerts.json")
    let alertData
    // TODO: check if lines 15-23 are done correct
    try{
        alertData = await fetched.json()
    } catch {
        shouldGenerate = false
    }

    if (shouldGenerate && alertData.length == 0) {
        shouldGenerate = false
    }

    if (shouldGenerate) {
        const alertListElement = document.createElement("section")
        alertListElement.classList.add("alert-list")

        alertData.forEach((alert) => {
            const alertElement = document.createElement("p")
            
            alertElement.textContent = alert.message
            alertElement.style.color = alert.color
            alertElement.style.backgroundColor = alert.background || "white"
            
            alertListElement.appendChild(alertElement)
        })

        document.querySelector("main").prepend(alertListElement)
    }

}

generateAlerts()