import { SERVICES } from "commoners:env"
// const { SERVICES } = commoners
 
const messages = document.getElementById('messages') as HTMLElement

const display = (message: string) => {
  messages.innerHTML += `<div>${message}</div>`
  messages.scrollTop = messages.scrollHeight;
}

const status: {
  connected: boolean | null
} = {
  connected: null
}

const poll = () => {
  fetch(SERVICES.tsNode.url).then((res) => {

    if (res.ok) {
      if (!status.connected) display('Application is connected to service')
    }
    else {
      if (status.connected) display('Application has been disconnected from service')
    }

    status.connected = res.ok
  })
}

poll()
setInterval(poll, 2000)