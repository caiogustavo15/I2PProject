let cv,dataTotal, dataMale, dataFemale, p, c,m,a;

function preload(){

  dataTotal = loadTable('./data/population1967_2017.csv', 'csv');
  dataMale = loadTable('./data/malePopulation1967_2017.csv', 'csv');
  dataFemale = loadTable('./data/femalePopulation1967_2017.csv', 'csv');

  m = new Map();
  m.start();

}

function setup(){

  cv = createCanvas(700,550);
  cv.parent('canvas');
  //
  p = new Pop(dataTotal.getArray(), dataMale.getArray(), dataFemale.getArray());
  p.start();
  p.draw();
  cv.mouseWheel(zoom);

}

function hoverd(){
  p.clicked(mouseX,mouseY);
}

function zoom(event){
  console.log('zoom');
  p.zoomMod(event);
}

function draw(){
    cv.mouseOver(hoverd);
}
