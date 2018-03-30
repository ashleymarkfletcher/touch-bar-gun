const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let slots = []
const numSlots = 6

const emptyButton = () => new TouchBarButton({
    backgroundColor: '#000000'
})

const initSlots = (numSlots) => {
    const newSlots = []
    for (let i = 0; i < numSlots; i++) {
        newSlots.push(emptyButton())
    }
    return newSlots
}

slots = initSlots(numSlots)

// Reel labels
const reel1 = new TouchBarLabel({ label: "test" })

// Spin result label
const result = new TouchBarLabel()

// Spin button
const spin = new TouchBarButton({
    label: '🔫',
    // backgroundColor: '#7851A9',
    click: () => {
        shoot()
    }
})

const touchBar = new TouchBar([
    ...slots,
    spin
])

const shoot = () => {
    const time = 100
    let numMoves = numSlots - 1

    slots[numSlots - 1].label = ' 🔥🔥🔥'

    const bulletMove = setInterval(() => {

        slots[numMoves - 1].label = ' 🔥🔥🔥'
        slots[numMoves].label = ''

        numMoves--

        if (numMoves === 0) clearInterval(bulletMove)
        slots[0].label = ''
    }, time)
}

let window

app.once('ready', () => {
    window = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hiddenInset',
        width: 200,
        height: 200,
        backgroundColor: '#000'
    })
    window.loadURL('about:blank')
    window.setTouchBar(touchBar)
})