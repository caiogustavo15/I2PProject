function Country(title, code, totalPop, malePop, femalePop, years, layout){

  this.title = title;
  this.code = code;
  this.totalPop = totalPop;
  this.malePop = malePop;
  this.femalePop = femalePop;
  this.years = years;
  this.layout = layout;

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

  this.draw = function (year=2017){
    drawTitle(this.title, this.layout);
    let a = this.getDataByYear(year);
    if(a == 'error'){
      alert(`Sorry, you are trying to draw a year we that we don't have data for.`);
      return;
    }
    // drawYAxisLabels(min, max, layout, mapFunction,decimalPlaces)
    // // Draw all y-axis labels.
    drawYAxisLabels(min(this.totalPop),
                    max(this.totalPop),
                    this.layout,
                    this.mapPopToHeightLabel.bind(this),
                    0);

    //
    // // debugger;
    var numYears = this.years[this.years.length - 1] - this.years[0];
    var previous = {
          year: this.years[0],
          totalPop: this.totalPop[0]
      };

    for(let i = 0; i < this.years.length ; i++){
      var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);
      // Draw the tick label marking the start of the previous year.
      if (i % xLabelSkip == 0) {
        drawXAxisLabel(previous.year, this.layout,
                       this.mapYearToWidth.bind(this));
      }
      previous.year = this.years[i];
      previous.totalPop = this.totalPop[i];
    }
        // console.log(a)
    // console.log(`data: t ${a.totalPop} m ${a.malePop} f ${a.femalePop}`);
    // console.log(`Contry Name: ${this.name}`);
    fill(random(255),random(255),random(255));
    ellipse(width/2,height/2,20)
    // loop();
  }

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

}
