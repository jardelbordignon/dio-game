let order = [], clickedOrder = [], score = 0

/**
 * 0 -> green
 * 1 -> red
 * 2 -> yellow
 * 3 -> blue
 */

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

const messageInfo = document.querySelector('.info span')
const scoreInfo = document.querySelector('.info strong')
const button = document.querySelector('.info button')


// função que retorna a cor
const createColorElement = color => {
  switch (color) {
    case 0:
      return green
    case 1:
      return red
    case 2:
      return yellow
    default:
      return blue
  }
}

// cria ordem aleatória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickedOrder = []

  // for (let i in order) {
  //   let elementColor = createColorElement(order[i])
  //   setTimeout(() => lightColor(elementColor, Number(i) + 1), 2000)
  // }

  const handleLightColor = i => {
    if (i < order.length) {
      const element = createColorElement(order[i])
      element.classList.add('selected')

      setTimeout(() => {
        element.classList.remove('selected')
        setTimeout(() => handleLightColor(++i), 300);
      }, 800);
    }
  }

  handleLightColor(0)
}


// função para próximo nível do jogo
const nextLevel = () => {
  score++
  setTimeout(() => shuffleOrder(), 1500)
}

// função de inicio de jogo
const playGame = () => {
  score = 0
  messageInfo.innerHTML = 'Bem vindo ao Genius!'
  scoreInfo.innerHTML = score
  button.style.display = 'none'

  nextLevel()
}

// função de fim de jogo
const gameOver = () => {
  order = []
  clickedOrder = []

  messageInfo.innerHTML = 'Fim de jogo'
  scoreInfo.innerHTML =`${score}`
  
  button.style.display = 'block'
}

// checa se os botões clicados são os mesmos da ordem gerada no jogo
const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) return gameOver()
  }

  if (clickedOrder.length == order.length) {
    scoreInfo.innerHTML = score
    nextLevel()
  }
}

// função para o clique do usuário
const click = color => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected')
  setTimeout(() => {
    createColorElement(color).classList.remove('selected'),
    checkOrder()
  }, 250)
}

green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)
button.onclick = () => playGame()
 
playGame()
