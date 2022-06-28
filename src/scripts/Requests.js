import { getRequests, getPlumbers, saveCompletion, getCompletions } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"


export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    const requestString = (request) => {
        return `<li> ${request.description}
        <select class="plumbers" id="plumbers">
            <option value="">Choose Plumber</option>
            ${plumbers.map(
                plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            } ).join("")
            }
            </select>
            <button class="request__delete"
                    id="request--${request.id}">
                Delete
            </button>
        </li>`
    }

    let html = `
        <ul>
            ${ 
                requests.map(requestString).join("")
            }
        </ul>
    `

    return html
}

export const Completions = () => {
    const completions = getCompletions()
    const requests = getRequests()

    const completionString = (request) => {
        return `<li> ${request.description} </li>`
    }
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletion(completion)
        }
    }
)