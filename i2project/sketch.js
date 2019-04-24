
let cv,dataTotal, dataMale, dataFemale, p, c,m,a;

function preload(){

  dataTotal = loadTable('./data/population1967_2017.csv', 'csv');
  dataMale = loadTable('./data/malePopulation1967_2017.csv', 'csv');
  dataFemale = loadTable('./data/femalePopulation1967_2017.csv', 'csv');

  m = new Map();
  m.start();

}

function setup(){

  cv = createCanvas(700,500);
  cv.parent('canvas');

  p = new Pop(dataTotal.getArray(), dataMale.getArray(), dataFemale.getArray());
  p.start();
  p.draw();
  cv.mouseWheel(zoom);

}

function mouseClicked(){
  p.clicked(mouseX,mouseY);
  for(let i = 0 ; i < p.countries.length ; i++){
    p.countries[i].clicked(mouseX,mouseY);
  }
}

function zoom(event){
  p.zoomMod(event);
}
