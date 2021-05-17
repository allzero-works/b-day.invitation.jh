let cnv, letter_holder
let video_owl, img_letter, letter
let cnv_height
let is_letter_arrived, is_ready_to_interact=false, not_played_yet = true


function preload(){
  video_owl = createVideo(['Assets/owl.mp4'], videoLoaded);
  video_owl.onended(owlArrived)
  img_letter = loadImage('Assets/acceptance-letter.png')
  letter = createImg('/Assets/acceptance-letter-2x.png', 'acceptance-letter')
  letter.hide()
}

function videoLoaded(){
  is_ready_to_interact = true
}

function calculateWidth(w){
  if (w < 576){
    return windowWidth
  }else if (w < 768){
    return 540
  }else if (w < 992){
    return 720
  }else if (w < 1200){
    return 960
  }else if (w < 1400){
    return 1140
  }else{
    return 1320
  }
}

function setup() {
  container = document.querySelector(".cnv-holder")
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  cnv = createCanvas(cnv_width, cnv_height)
  cnv.parent(container)
  
  letter_holder = document.querySelector(".letter-holder")
  letter.parent(letter_holder)
  
  btn_group = createDiv('')
  btn_group.attribute('class', 'btn-group-vertical')
  btn1 = createButton("입학 통지서를 버린다")
  btn1.attribute('class','btn btn-outline-light')
  btn1.parent(btn_group)
  btn1.mousePressed(replay)
  
  btn2 = createButton("입학 통지서를 받는다")
  btn2.attribute('class','btn btn-outline-light')
  btn2.parent(btn_group)
  btn2.mousePressed(signed)
  btn_holder = document.querySelector(".btns-holder")
  btn_group.parent(btn_holder)
  btn_group.hide()
}

function replay(){
  // 편지를 거절한 경우,
  btn_group.hide()
  is_letter_arrived = false
  letter.hide()
  letter.removeAttribute('class', 'animate__animated animate__bounceInDown animate__slow')
  video_owl.play(1)
  btn1.html("입학 통지서를 다시 버린다")
}

function signed(){
  // 편지 받기를 누른 경우,
  btn_group.hide()
  localStorage.setItem('letter_accepted', true);
  print(localStorage.getItem('letter_accepted'))
}
  
function draw(){
  if(localStorage.getItem('letter_accepted')){
    background(30)
    fill(255)
    textSize(12)
      textAlign(CENTER, CENTER)
    text("편지를 수령해서 이제 더 이상 아무일도 일어나지 않는다.", width/2, height/2)
    return
  }
  if(!is_ready_to_interact){
    background(0)
    fill(255)
    textAlign(CENTER, CENTER)
    text("loading...", width/2, height/2)
  }
  else if(is_ready_to_interact & not_played_yet){
    background(30)
    fill(255)
    textSize(12)
    text("시작하려면 화면을 누르세요", width/2, height/2)
    if(mouseIsPressed){
      video_owl.play(1)
      not_played_yet = false
    }
  }
  else{
    if (video_owl)
    image(video_owl, 0, 0, width, height); // 캔버스에 비디오 프레임 그리기
    if(is_letter_arrived){ 
      textAlign(CENTER, CENTER)
      textSize(30)
      text("⬇", width/2, height/2)
      btn_group.show()
    }
  }
}

function owlArrived() {
  is_letter_arrived = true
  letter.show()
  letter.attribute('class', 'animate__animated animate__bounceInDown animate__slow')
}

function windowResized() {
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  resizeCanvas(cnv_width, cnv_height)
}