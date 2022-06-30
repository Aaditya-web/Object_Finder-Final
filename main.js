status = "";
objects=[];


function preload()
{
    
}

function setup(){
    canvas = createCanvas(400,260);
    canvas.position(700,400);

    
    video = createCapture(VIDEO);
    video.size(400, 260);
    video.hide();


}

function draw()
{
    image(video, 0, 0, 700, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects is " + objects.length;

           fill("#FF8C00");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
           textSize(27);
           noFill();
           stroke("#0000FF");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           
        }
    }

}


function speak(){
    if (object_input == objects[i].label){
        document.getElementById("status").innerHTML = "Object Found";
    }
    speak_data_1 = "The Mentioned Object has been found";
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}



function gotResult(){
    if (objects[i].label == object_input){
        document.getElementById("status").innerHTML = "Object Found";
    }

    else{
        document.getElementById("status").innerHTML = "Object not found";
    }
}
function modelLoaded()
{

    console.log("Model loaded!");
    status = true;

}

function start()
{
    
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";

object_input = document.getElementById("Input_Label").value;

}


