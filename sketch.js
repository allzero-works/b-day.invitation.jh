let cnv, letter_holder
let video_owl, letter
let cnv_height
let is_letter_arrived, is_ready_to_interact=false, not_played_yet = true


function preload(){
  // 로드 되기 전에,
  // 영상 준비
  video_owl = createVideo(['Assets/owl.mp4'], videoLoaded);
  video_owl.onended(owlArrived)
  // 이미지 준비
  letter = createImg('Assets/acceptance-letter-2x.png', 'acceptance-letter')
  // letter.hide()
}

function videoLoaded(){
  // 비디오가 준비 되면,
  is_ready_to_interact = true
}

function calculateWidth(w){
  // 브라우저의 윈도우 크기에 따른 bootstrap .container의 가로폭 크기 반환
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
  // 캔버스 생성
  container = document.querySelector(".cnv-holder")
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  cnv = createCanvas(cnv_width, cnv_height)
  cnv.parent(container)
  
  // 편지 div에 자식 요소로 편지 할당
  letter_holder = document.querySelector(".letter-holder")
  letter.parent(letter_holder)
  
  // 편지 도착 이후의 버튼 그룹
  btn_group = createDiv('')
  btn_group.attribute('class', 'btn-group-vertical')
  // 버튼 1
  btn1 = createButton("입학 통지서를 버린다")
  btn1.attribute('class','btn btn-outline-light')
  btn1.parent(btn_group)
  btn1.mousePressed(replay)
  // 버튼 2
  btn2 = createButton("입학 통지서를 받는다")
  btn2.attribute('class','btn btn-outline-light')
  btn2.parent(btn_group)
  btn2.mousePressed(signed)
  // 버튼 담는 div
  btn_holder = document.querySelector(".btns-holder")
  btn_group.parent(btn_holder)
  btn_group.hide() // 숨겨둠
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
  // 이미 편지를 받은 경우, 새로 고침해도 편지가 나오지 않는다.
  if(localStorage.getItem('letter_accepted')){
    background(30)
    fill(255)
    textSize(12)
      textAlign(CENTER, CENTER)
    text("편지를 수령해서 이제 더 이상 아무일도 일어나지 않는다.", width/2, height/2)
    return
  }
  // 영상이 아직 로딩되지 않은 경우,
  if(!is_ready_to_interact){
    // 로딩 중 화면,
    background(0)
    fill(255)
    textAlign(CENTER, CENTER)
    text("loading...", width/2, height/2)
  }
  // 영상은 로딩되었으나, 시작하기 (클릭)를 하지 않은 경우,
  // (크롬 브라우저에서는 오디오가 있는 영상의 경우 클릭 등 브라우저와의 인터랙션 이후에 재생이 가능함)
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
  // 클릭이 된 이후,
  else{
    if (video_owl)
      image(video_owl, 0, 0, width, height); // 캔버스에 비디오 프레임 그리기
   
    // 편지가 도착한 경우, 텍스트 기호로 아래 화살표 & 버튼 그룹 표시
    if(is_letter_arrived){ 
      textAlign(CENTER, CENTER)
      textSize(30)
      text("⬇", width/2, height/2)
      btn_group.show()
    }
  }
}

// 영상이 끝난 경우,
function owlArrived() {
  is_letter_arrived = true
  letter.show()
  letter.attribute('class', 'animate__animated animate__bounceInDown animate__slow')
}

// 창 크기가 바뀐 경우, 창크기에 맞춰 canvas 크기를 재조정한다.
function windowResized() {
  cnv_width = calculateWidth(windowWidth)
  cnv_height = cnv_width / 1280 * 720
  resizeCanvas(cnv_width, cnv_height)
}