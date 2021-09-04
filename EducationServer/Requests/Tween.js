var Objects = {}
var Tweens = {}
var lastTimestamp = 0

function GetNewObjKey()
{
    let Key = ""
    for (let i = 0; i < 10; i++)
        Key += Math.random(0, 9)

    if (Tweens[Key])
        return GetNewObjKey()

    return Key
}

function DefaultTween(x)
{
    return x;
}

function DefaultCallBack(){console.log("Tween Finished")}

class Tween {
    constructor(Obj, PropertyTable, Time, TweenFunction, CallBack) {
        let MatchFound = false
        for (var key in Objects){
            const Object = Objects[key]
            if (Object == Obj)
            {
                this.Key = Key
                MatchFound = true
            }
        }; 

        if (!MatchFound)
        {
            this.Key = GetNewObjKey()
            Objects[this.Key] = Obj
        }

        var DifferenceTable = {}
        var PropertyTypeTable = {}

        for (var Property in PropertyTable) {
            DifferenceTable[Property] = Obj[Property] - PropertyTable[Property]

            var PropertyType = "number"

            PropertyTypeTable[Property]
        }

        this.Obj = Obj
        this.PropertyTable = PropertyTable
        this.DifferenceTable = DifferenceTable
        this.Time = Time || 1
        this.TweenFunction = TweenFunction || DefaultTween 
        this.CallBack = CallBack || DefaultCallBack

        this.alpha = 0

        Objects[this.Key] = Objects
    }

    Play() {
        Tweens[this.Key] = this
    }
}

function Update(timestamp) {
    const DeltaTime = (timestamp - lastTimestamp)/1000
    lastTimestamp = timestamp

    for (var key in Tweens){
        const Tween = Tweens[key]
        
        if (!Tween)
            continue;

        Tween.alpha += DeltaTime/Tween.Time

        Tween.Obj[Tween.Property] = Tween.StartingValue + Tween.TweenFunction(Tween.Difference*Tween.alpha)

        if (Tween.alpha > 1)
        {
            Tweens[key] = null
            Tween.Obj[Tween.Property] = Tween.StartingValue + Tween.Difference*1
            Tween.CallBack()
        }
    };

    requestAnimationFrame(Update)
}

requestAnimationFrame(Update)

export {Tween}