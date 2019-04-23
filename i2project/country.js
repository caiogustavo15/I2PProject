function Country(title, code, totalPop, malePop, femalePop, years, layout){

  this.title = title;
  this.code = code;
  this.totalPop = totalPop;
  this.malePop = malePop;
  this.femalePop = femalePop;
  this.years = years;
  this.layout = layout;

  this.total = [];
  this.male = [];
  this.female = [];

  this.zoomY = 1;
  this.radius = 5;

  this.getDataByYear = function (year){

    if(year > this.years[this.years.length-1]){
      return 'error';
    }

    for(var i = 0 ; i < this.years.length ; i++){
      if (this.years[i] == year){
        let data = {
          'totalPop' : this.totalPop[i],
          'malePop' : this.malePop[i],
          'femalePop' : this.femalePop[i]
        }
        return data;
      }
    }
  };

  this.draw = function (){
    clear();
    clearDiv();
    drawTitle(this.title, this.layout);
    drawAxes(this.layout);
    // // Draw all y-axis labels.
    drawYAxisLabels(1000000/this.zoomY,
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

    for(let i = 1; i < this.years.length ; i++){
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
               'y': this.mapY(t.totalPop),
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
    }
  };

  this.clicked = function (x,y){
    let msg='';
    //check total pop array
    for(let i = 0 ; i < this.total.length ; i++){
      if (dist(this.total[i].x,this.total[i].y, x, y) < this.radius ){
        // alert(` T ${this.total[i].year} ${this.total[i].pop} `);
        msg += `${this.title} population in ${this.total[i].year} was ${this.total[i].pop} people.`;
        break;
      }
    }

    //check male pop array
    for(let i = 0 ; i < this.male.length ; i++){
      if (dist(this.male[i].x,this.male[i].y, x, y) < this.radius ){
        // alert(` M ${this.male[i].year} ${this.male[i].pop} `);
        msg += `${this.title} male population in ${this.male[i].year} was ${this.male[i].pop}.`;
        break;
      }
    }

    //check female pop array
    for(let i = 0 ; i < this.female.length ; i++){
      if (dist(this.female[i].x,this.female[i].y, x, y) < this.radius ){
        // alert(` F ${this.female[i].year} ${this.female[i].pop} `);
        msg += `${this.title} female population in ${this.female[i].year} was ${this.female[i].pop}.`;
        break;
      }
    }

    if(msg !=''){
      displayMsg(msg);
    }
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
               1000000/this.zoomY,
               max(this.totalPop),
               this.layout.bottomMargin,
               this.layout.topMargin);
  };

}
