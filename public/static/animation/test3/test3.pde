int rStart, rStop;
float[] radii1;
float[] radii2;
float[] angles1;
float[] angles2;
float[] sradii;
float[] sangles;
float nX, nY, yY;
float masterX, masterY;
float nRadius, outRadius;
int degs;
float inBetween, totalTweens;
int layers;
int gap;
PGraphics pg;

float[] doNewCircle() {
  float[] theCircle = new float[degs];
  for (int i=0;i<degs;i++) {
    theCircle[i]=outRadius-random(outRadius);
  }
  return theCircle;
}

float[] doNewAngles() {
  float[] theAngles = new float[degs];
  for (int i=0;i<degs;i++) {
    theAngles[i]=random(360);
  }
  return theAngles;
}

void setup() {
  colorMode(RGB);
  smooth();
  size(600, 600);
  pg = createGraphics(600,600);
  degs=8;
  nRadius=2;
  outRadius=250;
  totalTweens=40.0;
  inBetween=0.0;
  radii1 = new float[degs];
  radii2 = new float[degs];
  angles1 = new float[degs];
  angles2 = new float[degs];
  radii1 = doNewCircle();
  radii2 = doNewCircle();
  angles1 = doNewAngles();
  angles2 = doNewAngles();
  masterX=-width/2;
  masterY=height/2;
  frameRate(20.0);
  layers = 15;
  gap = 10;
  sradii = new float[] {130,120,70,100,130,120,70,100};;
  sangles = new float[] {350,40,190,140,170,220,10,320};;
}


void draw() {
  float[] hybridCircle = new float[degs];
  float[] hybridAngles = new float[degs];
  hybridCircle=doInterpolate(radii1, radii2, inBetween/totalTweens);
  hybridAngles =doInterpolate(angles1, angles2, inBetween/totalTweens);
  doSimpleOutline(hybridCircle, hybridAngles);
  inBetween++;
  if (inBetween == totalTweens) {
    inBetween = 0;
    radii1 = radii2;
    angles1 = angles2;
    if (mouseX < (masterX+outRadius*0.7) && mouseX > (masterX-outRadius*0.7) && mouseY < (masterY+outRadius*0.7) && mouseY > (masterY-outRadius*0.7)) {
      radii2 = sradii;
      angles2 = sangles;
    }else{  
      radii2 = doNewCircle();
      angles2 = doNewAngles();
    }
  }
}

float[] doInterpolate(float[] cOne, float[] cTwo, float beTwixt) {
  float[] ptTemp = new float[degs];
  for (int j=0; j<degs;j++) {
    ptTemp[j]=coslerp(cOne[j], cTwo[j], beTwixt);
  }
  return ptTemp;
}

void doSimpleOutline(float[] myCircle, float[] myAngles) {
  masterX=width/2;
  doDrawCircle(int(masterX), int(masterY), myCircle, myAngles);
}

float coslerp(float val1, float val2, float amt) {
  amt = map (cos(amt*PI), 1.0, -1.0, 0, 1.0);
  return lerp(val1, val2, amt);
}

void doDrawCircle(int xPos, int yPos, float[] ptRad, float[] ptAng) {  

  color col=color(255, 116, 46);
  pg.beginDraw(); 
  pg.translate(xPos, yPos);
  pg.rotate(radians(frameCount * 0.2));
  pg.stroke(col);
  pg.background(255);
  pg.strokeWeight(1);
  pg.fill(255, 0);
  for (int i = 1; i < (layers + 1); i++) {
    pg.beginShape();
    for (int j=0;j<degs;j=j+1) { 
      float rj=radians(ptAng[j]);
      float xA=sin(rj) * (ptRad[j] / layers * i);
      float yA=cos(rj) * (ptRad[j] / layers * i);
      pg.curveVertex(xA, yA);
    }
    for (int j=0;j<3;j=j+1) { 
      float rj=radians(ptAng[j]);
      float xA=sin(rj) * (ptRad[j] / layers * i);
      float yA=cos(rj) * (ptRad[j] / layers * i);
      pg.curveVertex(xA , yA);
    }
    pg.endShape();
  }
  pg.endDraw();
  image(pg,0,0);
}