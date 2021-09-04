import { Tween } from '/Modules/Tween.js'

const Button1 = document.getElementById("button1");
const Button2 = document.getElementById("button2");

Button1.style["font-size"] = "201%"
Button1.innerHTML = "Test"

const Button1Tween = new Tween(Button1.style, "font-size", 50, 1)

Button1.onmouseover = function() {
    Button1Tween.Play()
}