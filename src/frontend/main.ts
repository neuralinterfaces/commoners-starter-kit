import { BleClient } from '@capacitor-community/bluetooth-le';


const list = document.querySelector('#commands') as HTMLUListElement



async function createClient(url: string | URL, id = '') {

  url = new URL('.commoners', url)
  
  const client = await new SwaggerClient(typeof url === 'string' ? url : url.href).catch((e: any) => {
    throw new Error(`Failed to create client for ${url}: ${e.message}`)
  })

  const nestedList = document.createElement('ul')
  nestedList.id = id
  list.appendChild(nestedList)


  const { title, description } = client.spec.info
  const section = document.createElement('section')
  section.innerHTML = `<h3>${title}</h3><small>${description}</small>`
  nestedList.append(section)

  // Populate list of available methods
  Object.keys(client.spec.paths).forEach((path: any) => {
    const info = client.spec.paths[path]

    const keys = Object.keys(info)
    keys.forEach((method: any) => {
      const { operationId, tags, description } = info[method]
      const li = document.createElement('li') 
      const container = document.createElement('div')     
      container.innerHTML = `${operationId ?? path}${keys.length > 1 ? ` (${method})` : ''}<br>${description ? `<small>${description}</small><br/>` : ''} <div class="tags">${tags.map(tag => `<div>${tag}</div>`)}</div>`

      const button = document.createElement('button')
      button.innerText = 'Run'
      button.onclick = async () => {
          const result = await client.apis[tags[0]][operationId]()
          onData({ source: title, command: operationId, payload: result.body })
      }

      li.append(container, button)
      nestedList.appendChild(li)
    })
  })

  return client
}

const messages = document.getElementById('messages') as HTMLElement

const display = (message: string) => {
  messages.innerHTML += `<div>${message}</div>`
  messages.scrollTop = messages.scrollHeight;
}

const onData = (data: any) => {
  if (data.error) return console.error(data.error)

  display(`${data.source ? `${data.source} (${data.command})` : data.command} - ${JSON.stringify(data.payload)}`)
}

// Remote API Tests (Basic Fetch Commands)
if (commoners.services.remote && commoners.services.dynamic) {
    const remoteAPI = new URL('/users', commoners.services.remote.url)
    const dynamicAPI = new URL('/users', commoners.services.dynamic.url)

    setTimeout(() => {

      fetch(remoteAPI)
      .then(response => response.json())
      .then(json => onData({source: 'Remote', command: 'users', payload: json.length}))
      .catch(e => console.error('Failed to request from remote server', e))

      fetch(dynamicAPI)
      .then(response => response.json())
      .then(json => onData({source: `Dynamic`, command: 'users', payload: json.length}))
      .catch(e => console.error('Failed to request from dynamic server', e))
    })

} 




// --------- Node Service Test (WebSockets) ---------
const nodeServices = { LocalNode: commoners.services.localNode, DynamicNode: commoners.services.dynamicNode }

console.log(commoners)
Object.entries(nodeServices).forEach(([label, service]) => {

  if (service) {
    const url = new URL(service.url)

    try {
      const ws = new WebSocket(`ws://${url.host}`)

      ws.onmessage = (o) => {
        const data = JSON.parse(o.data)
        onData({source: label, ...data})
      }

      let send = (o: any) => {
        ws.send(JSON.stringify(o))
      }

      ws.onopen = () => {
        send({ command: 'platform' })
        send({ command: 'version' })
      }
    } catch (e) {
      console.error('Failed to connect to Node.js server', e)
    }
  }
})

// --------- Python Service Test (OpenAPI) ---------
if (commoners.services.python) {

  const pythonUrl = new URL(commoners.services.python.url) // Equivalent to commoners://python

  const runCommands = async () => {
      fetch(new URL('version', pythonUrl))
      .then(res => res.json())
      .then(payload => onData({ source: 'Python', command: 'version', payload }))
      .catch(e => console.error('Failed to request from Python server', e))
  }

  const service = commoners.services.python
  if (commoners.target === 'desktop'){
    service.onActivityDetected(runCommands)

    service.onClosed(() => {
      console.error('Python server was closed!')
    })
  } 
  
  else runCommands()
 
}



// --------- Web Serial Test ---------
async function requestSerialPort () {

  try {

    const port = await navigator.serial.requestPort({ 
      // filters
    })
    const portInfo = port.getInfo()
    display(`Connected to Serial Port: vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId}`)
  } catch (e: any) {
    console.error(e)
  }
}


commoners.ready.then(plugins => {

  if ('local-services' in plugins) {

    const localServices = plugins['local-services']
    const ids: { [x:string]: string }  = {}

    localServices.onFound((url) => {
      if (ids[url]) return
      const id = ids[url] = Math.random().toString(36).substring(7)
      createClient(url, id)
    })

    localServices.onClosed((url) => {
      const el = document.getElementById(ids[url])
      if (el) el.remove()
      delete ids[url]
    })

    localServices.get()

  }


  const testSerialConnection = document.getElementById('testSerialConnection')
  if (testSerialConnection) {
    if ('serial' in plugins) testSerialConnection.addEventListener('click', requestSerialPort)
    else testSerialConnection.setAttribute('disabled', '')
  }
  // --------- Web Bluetooth Test ---------
  async function requestBluetoothDevice () {

    // Use the Capacitor API to support mobile
    await BleClient.initialize();
    const device = await BleClient.requestDevice();

    // const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    console.log(device)
    display(`Connected to Bluetooth Device: ${device.name || `ID: ${device.id}`}`)
  }

  const testBluetoothConnection = document.getElementById('testBluetoothConnection')

  if (testBluetoothConnection) {
    if ('bluetooth' in plugins) testBluetoothConnection.addEventListener('click', requestBluetoothDevice)
    else testBluetoothConnection.setAttribute('disabled', '')
  }

})
