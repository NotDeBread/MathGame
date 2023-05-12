const question = document.getElementById('question')
const questionTitle = document.getElementById('questionTitle')

let gameOver = false

let time = 60

let questionsAnswered = 0

function start() {
    document.getElementById('menu').style.setProperty('display','none')
    document.getElementById('vignette').classList.add('vignetteAnim')
    setInterval(() => {
        if(time > 0) {
            time--
        } 
        if(time === 0) {
            gameOver = true
            document.getElementById('vignette').classList.remove('vignetteAnim')
            document.getElementById('resultScore').innerText = `Score: ${score}`
            document.getElementById('resultQuestions').innerText = `Questions Answered: ${questionsAnswered}`

            document.getElementById('results').style.setProperty('display','flex')
            setTimeout(() => {
                document.getElementById('results').style.setProperty('opacity','1')
            }, 100);
        }
        document.getElementById('timer').innerText = time
    }, 1000);
}

const grids = [
    [
        image = 'grids/0.png',
        slope = '1/2',
        y = '3'
    ],
    [
        image = 'grids/1.png',
        slope = '2',
        y = '1'
    ],
    [
        image = 'grids/2.png',
        slope = '1/3',
        y = '5'
    ],
    [
        image = 'grids/3.png',
        slope = '-1',
        y = '-2'
    ],
    [
        image = 'grids/4.png',
        slope = '1',
        y = '0'
    ],
    [
        image = 'grids/5.png',
        slope = '-2',
        y = '-4'
    ],
    [
        image = 'grids/6.png',
        slope = '-1',
        y = '1'
    ],
    [
        image = 'grids/7.png',
        slope = '1/3',
        y = '-4'
    ],
    [
        image = 'grids/8.png',
        slope = '1/5',
        y = '-2'
    ],
    [
        image = 'grids/9.png',
        slope = '3',
        y = '-9'
    ],
    [
        image = 'grids/10.png',
        slope = '-1/3',
        y = '8'
    ],
    [
        image = 'grids/11.png',
        slope = '-2',
        y = '2'
    ],
]

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        submit()
    }
})

let screenShake = 0

let answer = ''
let questionMode = Math.floor(Math.random() * 2)
let questionType = Math.floor(Math.random() * 2)

let score = 0
let multiplier = 1

randomQuestion()

function randomQuestion() {

    questionMode = Math.floor(Math.random() * 2)
    questionType = Math.floor(Math.random() * 2)        

    if(questionType === 0) {
        questionTitle.innerText = 'What is the slope?'
    } else if(questionType === 1) {
        questionTitle.innerText = 'What is the y-intercept?'
    } else {
        questionTitle.innerText = 'whoops'
    }

    if(questionMode === 0) {      
        
        document.getElementById('gridContainer').style.setProperty('display','none')
        document.getElementById('questionContainer').style.setProperty('display','flex')
        
        let slope = Math.round((Math.random() * 10) + 1)
        let slopeSymbol = '+'
    
        if(Math.floor(Math.random() * 2) === 0) {
            slopeSymbol = ''
        } else {
            slopeSymbol = '-'
        }
    
        let yIntercept = Math.round(Math.random() * 10 + 1)
        let yInterceptSymbol = '+'
    
        if(Math.floor(Math.random() * 2) === 0) {
            yInterceptSymbol = '+'
        } else {
            yInterceptSymbol = '-'
        }
    
        question.innerText = `y = ${slopeSymbol}${slope}x ${yInterceptSymbol} ${yIntercept}`

        if(questionType === 0) {
            answer = `${slopeSymbol}${slope}`    
        } else if(questionType === 1) {
            if(yInterceptSymbol === '-') {
                answer = `${yInterceptSymbol}${yIntercept}`
            } else {
                answer = `${yIntercept}`
            }
        }
        console.log(answer)
    } else if(questionMode === 1) {
        document.getElementById('gridContainer').style.setProperty('display','flex')
        document.getElementById('questionContainer').style.setProperty('display','none')

        let randomGrid = Math.floor(Math.random() * grids.length)

        document.getElementById('grid').src = grids[randomGrid][0]

        if(questionType === 0) {
            answer = grids[randomGrid][1]
        } else if(questionType === 1) {
            answer = grids[randomGrid][2] 
        }
        console.log(answer)
    }
}

function submit() {
    if(document.getElementById('input').value === answer && !gameOver) {
        randomQuestion()
        document.getElementById('input').value = ''
        score += 100 * multiplier
        multiplier++
        questionsAnswered++
        document.getElementById('multiplier').classList.add('multiplierAnim')
        setTimeout(() => {
            document.getElementById('multiplier').classList.remove('multiplierAnim')
        }, 500);
    } else {
        multiplier = 1
        screenShake = 10
        document.getElementById('damageVignette').classList.add('damageVignetteAnim')
        setTimeout(() => {
            document.getElementById('damageVignette').classList.remove('damageVignetteAnim')
        }, 500);
    }
    updateGUI()
}

function updateGUI() {
    document.getElementById('multiplier').innerText = `x${multiplier}`
    document.getElementById('score').innerText = score
}

setInterval(() => {
    if(screenShake > 0) {
        screenShake--
    }
    document.getElementById('GUI').style.setProperty('transform',`translateX(${(Math.random() * screenShake * 2) - screenShake}px) translateY(${(Math.random() * screenShake * 2) - screenShake}px)`)
}, 10);