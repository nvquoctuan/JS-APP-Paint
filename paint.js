var paint = function(){
    this.canvas = null;
    this.context = null;
    this.width = 500;
    this.height = 700;

    this.color = '#00000';
    this.lineWidth = 2;

    this.drawing = false;
    var self = this;

    this.savedMousePos = {x: 0, y: 0};

    this.init = function(){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;


        //apppend tag canvas in body
        document.body.appendChild(this.canvas);
        
        
        //call function listenEvent
        this.listenEvent();
        
    }
    
    this.listenEvent = function(){
        
        //listen event mouseDown with function procesMouseDown
        this.canvas.addEventListener('mousedown', self.processMouseDown);
        this.canvas.addEventListener('mouseup', self.processMouseUp);
        this.canvas.addEventListener('mousemove', self.processMouseMove);

    }

    this.processMouseDown = function(event){
        self.drawing = true; 
        self.savedMousePos = {x: event.layerX, y: event.layerY};
    }

    this.processMouseUp = function(event){
        self.drawing = false;
    }

    this.processMouseMove = function(event){
        if(self.drawing == false) return;
        
        //pos new
        var newMousePos = {x: event.layerX, y: event.layerY}
        
        //draw line from saved pos to new pos
        self.drawLine(self.savedMousePos.x, self.savedMousePos.y, newMousePos.x, newMousePos.y);

        //set saved pos = new pos
        self.savedMousePos = newMousePos;
    }

    this.drawLine = function(startX, startY, endX, endY){
        //begin path
        this.context.beginPath();

        //from 
        this.context.moveTo(startX, startY);

        //to
        this.context.lineTo(endX, endY);

        //linewidth and storkestyle
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.color;

        //draw it;
        this.context.stroke();
    }
    
}

var p = new paint();
p.init();

function setColor(color){
    colorCode = "#000000";
    switch(color){
        case "red": colorCode = "#FF0000"; break;
        case "green": colorCode = "#0FFF00"; break;
        case "blue": colorCode = "#1700FF"; break;
    }
    p.color = colorCode;
}

function setLineWidth(line){
    if(!line) line = 1;
    p.lineWidth = line;
}