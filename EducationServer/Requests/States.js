import { Tween } from '/Modules/Tween.js'

const canvas = document.querySelector('canvas')

const c = canvas.getContext("2d")

canvas.width = innerHeight
canvas.height = innerHeight

class Player {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.color = "blue"
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, 30, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

const player = new Player(100, 100)

function TweenCallBack()
{
    let PlayerTween = new Tween(player, 'x', 50, 1, null, TweenCallBack)

    PlayerTween.Play()
}

function Update() {
    c.fillStyle = "gray"
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()



    requestAnimationFrame(Update)
}

Update()