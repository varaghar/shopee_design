export default function sketch (p) {
  var radii1, radii2;
  var angles1, angles2;
  var sradii, sangles;
  var masterX, masterY;
  var outRadius;
  var degs;
  var inBetween, totalTweens;
  var layers;

  p.setup = function() {
    p.smooth();
    p.createCanvas(700, 500);
    degs=8;
    outRadius=250;
    totalTweens=80.0;
    inBetween=0.0;
    radii1 = new Array(degs);
    radii2 = new Array(degs);
    angles1 = new Array(degs);
    angles2 = new Array(degs);
    radii1 = doNewCircle();
    radii2 = doNewCircle();
    angles1 = doNewAngles();
    angles2 = doNewAngles();
    masterX=p.width/2;
    masterY=p.height/2;
    p.frameRate(20.0);
    layers = 15;
    sradii = [130,120,70,100,130,120,70,100];
    sangles = [350,40,190,140,170,220,10,320];
  }

  function doNewCircle() {
    var theCircle = new Array(degs);
    for (var i=0;i<degs;i++) {
      theCircle[i]=outRadius-p.random(outRadius)*0.5;
    }
    return theCircle;
  }

  function doNewAngles() {
    var theAngles = new Array(degs);
    for (var i=0;i<degs;i++) {
      theAngles[i]=p.random(360);
    }
    return theAngles;
  }
 
  p.draw = function () {
    var hybridCircle = new Array(degs);
    var hybridAngles = new Array(degs);
    hybridCircle = doInterpolate(radii1, radii2, inBetween/totalTweens);
    hybridAngles = doInterpolate(angles1, angles2, inBetween/totalTweens);
    doSimpleOutline(hybridCircle, hybridAngles);
    inBetween++;
    if (inBetween === totalTweens) {
      inBetween = 0;
      radii1 = radii2;
      angles1 = angles2;
      if (p.mouseX < (masterX+outRadius*0.7) && p.mouseX > (masterX-outRadius*0.7) && p.mouseY < (masterY+outRadius*0.7) && p.mouseY > (masterY-outRadius*0.7)) {
        radii2 = sradii;
        angles2 = sangles;
      }else{  
        radii2 = doNewCircle();
        angles2 = doNewAngles();
      }
    }
  }

  function doInterpolate(cOne, cTwo, beTwixt) {
    var ptTemp = new Array(degs);
    for (var j=0; j<degs;j++) {
      ptTemp[j]=coslerp(cOne[j], cTwo[j], beTwixt);
    }
    return ptTemp;
  }

  function doSimpleOutline(myCircle, myAngles) {
    masterX=p.width/2;
    doDrawCircle(masterX, masterY, myCircle, myAngles);
  }

  function coslerp(val1, val2, amt) {
    amt = p.map (p.cos(amt*p.PI), 1.0, -1.0, 0, 1.0);
    return p.lerp(val1, val2, amt);
  }

  function doDrawCircle(xPos, yPos, ptRad, ptAng) {  

    var col = p.color(255, 116, 46);
    p.translate(xPos, yPos);
    p.rotate(p.radians(p.frameCount * 0.2));
    p.stroke(col);
    p.background(255);
    p.strokeWeight(0.5);
    p.fill(255, 30);
    for (var i = 1; i < (layers + 1); i++) {
      p.beginShape();
      for (var j = 0; j < degs; j++) { 
        var rj=p.radians(ptAng[j]);
        var xA=p.sin(rj) * (ptRad[j] / layers * i);
        var yA=p.cos(rj) * (ptRad[j] / layers * i);
        p.curveVertex(xA, yA);
      }
      for (j = 0; j < 3; j++) { 
        rj=p.radians(ptAng[j]);
        xA=p.sin(rj) * (ptRad[j] / layers * i);
        yA=p.cos(rj) * (ptRad[j] / layers * i);
        p.curveVertex(xA , yA);
      }
      p.endShape();
    }
  }
}