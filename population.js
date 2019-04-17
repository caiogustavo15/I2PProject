function Pop(dataTotal, dataMale, dataFemale){
  var self = this;

  this.title = 'World Population';

  //all database (every country total, male and female population)
  this.dataTotal = dataTotal;
  this.dataMale = dataMale;
  this.dataFemale = dataFemale;

  //global data (every country total, male and female population)
  this.totalPop = this.dataTotal[this.dataTotal.length -1].slice(2,this.dataTotal.length -1);
  this.malePop = this.dataMale[this.dataMale.length -1].slice(2,this.dataMale.length -1);
  this.femalePop = this.dataFemale[this.dataFemale.length -1].slice(2,this.dataFemale.length -1);
  this.years = this.dataTotal[0].slice(2,this.dataTotal.length -1);

  //array of countries
  this.countries =[];
  //arrays to hold data for interaction
  this.total =[];
  this.male =[];
  this.female =[];

  this.zoomY = 1;
  this.zoomX = 1;
  this.radius = 5;
  this.marginSize = 15;
  this.layout = {
    marginSize: this.marginSize,

    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: this.marginSize * 4,
    rightMargin: width - this.marginSize * 3,
    topMargin: this.marginSize * 2,
    bottomMargin: height - this.marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },
    // Boolean to enable/disable background grid.
    grid: true,
    numYTickLabels : 14,
    numXTickLabels: 9
  };

  this.start = function(){

    textSize(12);

    for (var i = 1 ; i < this.dataTotal.length ; i++){
      let name = this.dataTotal[0,i][0,0];
      let code = this.dataTotal[0,i][0,1];
      let totalPop = [];
      let malePop = [];
      let femalePop = [];
      let years = [];
      for(var j = 2 ; j < this.dataTotal[0].length ; j++){
        totalPop.push(this.dataTotal[0,i][0,j]);
        malePop.push(this.dataMale[0,i][0,j]);
        femalePop.push(this.dataFemale[0,i][0,j]);
        years.push(this.dataTotal[0,0][0,j]);
      }

      this.countries.push(new Country(name, code, totalPop, malePop, femalePop, years, this.layout
      ));
    }
  };

  this.getIndex = function (country){
    for(var i = 0 ; i < this.countries.length ; i++){
      if(country == this.countries[i].title){
        return i;
      }
    }
    return 'getIndexError';
  };

  this.draw = function(country='all'){

    if(country == 'all'){
      this.drawTotal();
    }
    else{
      clear();
      drawAxes(this.layout);
      let index = this.getIndex(country);
      if(!isNaN(index)){
        this.countries[index].draw();
      }
      else{
        alert(`Sorry, we dont have any data for ${country} on our database.`);
        self.draw();
      }
    }

  };

  this.drawTotal = function() {
    clear();
    drawTitle(this.title, this.layout);
    drawAxes(this.layout);
    // // Draw all y-axis labels.
    drawYAxisLabels(1000000000/this.zoomY,//0,//min(this.totalPop)
                    max(this.totalPop),
                    this.layout,
                    this.mapY.bind(this),
                    0);

    var numYears = this.years[this.years.length - 1] - this.years[0];
    var t = {
          year: this.years[0],
          totalPop: this.totalPop[0]
        };
    var m = {
          year: this.years[0],
          totalPop: this.malePop[0]
        };
    var f = {
          year: this.years[0],
          totalPop: this.femalePop[0]
        };

    for(let i = 0; i < this.years.length ; i++){
      var xLabelSkip = ceil((numYears / this.layout.numXTickLabels));
      // Draw the tick label marking the start of the previous year.
      if (i % xLabelSkip == 0) {
        drawXAxisLabel(t.year, this.layout,
                       this.mapX.bind(this));
      }
      //draws total pop in red
      fill(255,0,0);
      drawEllipse (t.year,t.totalPop,this.radius,this.mapX.bind(this),this.mapY.bind(this));
      // ellipse(this.mapX(t.year),this.mapY(t.totalPop), this.radius);
      //push data to array for click events
      let d = {'x': this.mapX(t.year),
               'y':this.mapY(t.totalPop),
               'r': this.radius * 2,
               'year': this.years[i],
               'pop': this.totalPop[i]}
      this.total.push(d);
      //update values
      t.year = this.years[i];
      t.totalPop = this.totalPop[i];

      //draws male pop in green //
      fill(0,255,0);
      // ellipse(this.mapX(m.year),this.mapY(m.totalPop), this.radius);
      drawEllipse (m.year,m.totalPop,this.radius,this.mapX.bind(this),this.mapY.bind(this));
      //push data to array for click events
      d = {'x': this.mapX(m.year),
           'y':this.mapY(m.totalPop),
           'r': this.radius * 2,
           'year': this.years[i],
           'pop': this.malePop[i]}
      this.male.push(d);
      //update values
      m.year = this.years[i];
      m.totalPop = this.malePop[i];

      //draws female pop in blue //
      fill(0,0,255);
      // ellipse(this.mapX(f.year),this.mapY(f.totalPop), this.radius);
      drawEllipse (f.year,f.totalPop,this.radius,this.mapX.bind(this),this.mapY.bind(this));
      //push data to array for click events
      d = {'x': this.mapX(f.year),
           'y':this.mapY(f.totalPop),
           'r': this.radius * 2,
           'year': this.years[i],
           'pop': this.femalePop[i]}
      this.female.push(d);
      //update values
      f.year = this.years[i];
      f.totalPop = this.femalePop[i];
      // debugger;
    }
  };

  this.mapPopToHeightLabel = function(value) {
    return map( value,
                min(this.totalPop),
                max(this.totalPop),
                this.layout.bottomMargin,
                this.layout.topMargin);
  };

  this.mapYearToWidth = function(value) {
      return map(value,
                 this.years[0],
                 this.years[this.years.length-1],
                 this.layout.leftMargin,
                 this.layout.rightMargin);
  };

  this.mapX = function(value){
    return map(value,
               min(this.years),
               max(this.years),
               this.layout.leftMargin + this.layout.pad * 4,
               this.layout.rightMargin);
  };

  this.mapY = function(value){
    return map(value,
               1000000000/this.zoomY,
               max(this.totalPop),
               this.layout.bottomMargin,
               this.layout.topMargin);
  };

  this.clicked = function (x,y){
    //check total pop array
    for(let i = 0 ; i < this.total.length ; i++){
      if (dist(this.total[i].x,this.total[i].y, x, y) < this.radius ){
        console.log(this.total[i].year)
        console.log(this.total[i].pop)
      }
    }

    //check male pop array
    for(let i = 0 ; i < this.male.length ; i++){
      if (dist(this.male[i].x,this.male[i].y, x, y) < this.radius ){
        console.log(this.male[i].year)
        console.log(this.male[i].pop)
      }
    }

    //check female pop array
    for(let i = 0 ; i < this.female.length ; i++){
      if (dist(this.female[i].x,this.female[i].y, x, y) < this.radius ){
        console.log(this.female[i].year)
        console.log(this.female[i].pop)
      }
    }

  };

  this.zoomMod = function(event){
    //shift + mouseWheel to activate zoom
    if(event.shiftKey == true){
      if(event.deltaY > 0 && this.zoomY < 10){
        this.zoomY++;
        this.draw();
      }
      if(event.deltaY < 0 && this.zoomY > 1) {
        this.zoomY--;
        this.draw();
      }
    }
    // if(event.ctrlKey == true)
    // console.log(event.shiftKey);
    console.log(this.zoomY);
  }

}
