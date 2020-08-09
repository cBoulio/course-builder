var  dynamicCard = document.getElementById('dynamic-card-body')
var  fields = document.getElementById('dynamic-fields')

var shapeOne = "<div class='row' style='height: 100%;'><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test A</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test B</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 100%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div></div>";
var shapeTwo = "<div class='card-body m-0 pt-0 pb-0' style='border-style:solid; border-color: brown;'><div class='row' style='height: 100%;'><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 50%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 50%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test A</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test B</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div></div></div>1"

var cardTemplate = "<div class='card m-4 p-0' style='height: 90%;'><div class='card-header p-2' style='border-style:solid;padding: 0;margin: 0'><h5 class='card-title'>Header</h5></div><div class='card-body' style='border-style:solid; border-color: brown;' id='dynamic-card-body'></div><div class='card-footer p-2' style='border-style:solid;padding: 0;margin: 0'><h5 class='card-title'>footer</h5></div></div>";

var textAreaField = "<textarea id='sec1pan1-textarea' name='sec1pan1-textarea' rows='4' cols='50' style='border:1px solid #999999; width:100%;height:100%;padding:15px;'>Schoolio is pretty coolio Mr.Boulio</textarea>";

var videoField = "<iframe width='100%' height='100%' src='https://www.youtube.com/embed/cn5nLOWjgEo' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
var imageField = "<img src='../images/placeholder.jpg' alt='Placeholder'  style='width: 100%;height: 100%;' >";

var clicks = 0;
var layouts = 3;

var secId = 'pan1sec1';

var currentPanelIndex = 0;
var panels =[];

function createPanel(){
    
    var uniquePanelId = 'pan'+panels.length;

    let panelHeaderIdString = uniquePanelId+"Header";
    let panelBodyIdString = uniquePanelId+"Body";
    let panelFooterIdString = uniquePanelId+"Footer";
    
    var panel = {
        "id":uniquePanelId,
        "headerId":panelHeaderIdString,
        "bodyId":panelBodyIdString,
        "footerId":panelFooterIdString,
        "sections":1,
        "layout":"default",
    }
    panels.push(panel);
    currentPanelIndex = panels.length-1;

    addNewPanelToList(panelHeaderIdString, panelBodyIdString,panelFooterIdString );    
}   

function addNewPanelToList(headerId, bodyId, footerId){

    // get Current  - CARD LIST AKA PANEL LIST -----
    let currentPanelId = getCurrentPanel(); 

    let headerPlaceholder = "Header "+panels.length;
    let footerPlaceholder = "Footer "+panels.length;
 
    $(panelList).append("<div class='card m-4 p-0' style='height: 100%;' id='"+currentPanelId+"'>"+
                        "<div class='card-header pl-2 pt-4 pb-0' style='border-style:solid;height:10%'>"+
                        "<h5 class='card-title' id='"+headerId+"'>"+headerPlaceholder+"</h5>"+
                        "</div>"+
                        "<div class='card-body' style='border-style:solid; border-color: brown;height:100%;' id='"+bodyId+"'></div>"+
                        "<div class='card-footer p-2' style='border-style:solid;padding: 0;margin: 0;height:6%'>"+
                        "<h5 class='card-title' id='"+footerId+"'>"+footerPlaceholder+"</h5>"+
                        "</div>"+
                        "</div>");

    setLayoutA(currentPanelId);
    scrollTo(currentPanelId)         

    $(currentHeaderTicker).html("Header - "+panels.length);
    $(currentPanelTicker).html("Current Panel - "+panels.length);
    $(currentFooterTicker).html("Footer - "+panels.length);
}   

function scrollTo(panelId) {
    document.getElementById(panelId).scrollIntoView(); 
};

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        scrolledUp()
    }
    else {
        scrolledDown()
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp")        scrolledUp()
    else if (e.code === "ArrowDown") scrolledDown()
  
});

function scrolledUp() {
    
    if(currentPanelIndex == 0 && panels.length == 0){
        console.log('Here scroll up all the way')
        $(panelList).scrollTop(0); 
        let indexTicker = 0;
        $(currentHeaderTicker).html("Header - "+indexTicker);
        $(currentPanelTicker).html("Current Panel - "+indexTicker);
        $(currentFooterTicker).html("Footer - "+indexTicker);
    }else if(currentPanelIndex == 1){
        console.log('Here scroll up all the way')
        scrollTo(panels[currentPanelIndex-1].id);
        let indexTicker = 1;
        $(currentHeaderTicker).html("Header - "+indexTicker);
        $(currentPanelTicker).html("Current Panel - "+indexTicker);
        $(currentFooterTicker).html("Footer - "+indexTicker);
    }else{
        scrollTo(panels[currentPanelIndex-1].id);
        let indexTicker = currentPanelIndex;
        $(currentHeaderTicker).html("Header - "+indexTicker);
        $(currentPanelTicker).html("Current Panel - "+indexTicker);
        $(currentFooterTicker).html("Footer - "+indexTicker);
    }
    
    if(currentPanelIndex != 0 || currentPanelIndex != 1){
        currentPanelIndex = currentPanelIndex-1;
    }
    
  
}



function scrolledDown(){
    
    scrollTo(panels[currentPanelIndex+1].id);
    currentPanelIndex += 1;
    let indexTicker = currentPanelIndex+1;
    $(currentHeaderTicker).html("Header - "+indexTicker);
    $(currentPanelTicker).html("Current Panel - "+indexTicker);
    $(currentFooterTicker).html("Footer - "+indexTicker);

}



function getCurrentPanel(){
  
    let currentPanel = panels[currentPanelIndex].id;
    return currentPanel;

}

function getCurrentPanelObject(){
  
    let currentPanel = panels[currentPanelIndex];
    return currentPanel;

}

function downLayout(){
    
    changeLayout();

    if(clicks == 0){
        clicks = layouts-1;
    }else{
        clicks -= 1;
    }  
}

function upLayout(){
    changeLayout();
    if(clicks == layouts-1){
        clicks = 0;
    }else{
        clicks += 1;
    }
}

function changeLayout(){

    
    let currentPanelId = getCurrentPanel();
  
    if(clicks == 0){
        setLayoutA(currentPanelId);
    }else if(clicks == 1){
        setLayoutB(currentPanelId);
    }else if(clicks == 2){
        setLayoutC(currentPanelId);
    }
}



function getFieldString(sectionNum, sectionId){

    let sectionString = 'Section '+(sectionNum+1);
    
    var selectorButtonId = 'selectorButton'+sectionId;
    var selectorButtonDetails = 'selectorButtonDetails'+sectionId;
    var editOptionsId = 'editOptions'+sectionId;
    var fieldSelectorButtonListId = 'fieldSelectorButtonList'+sectionId;
    var collapseMenuId = 'collapsableMenu'+sectionId;

    return  "<div class='row'>"+
                "<div class='col-12'>"+
                "<div class='row ml-4'>"+
                    "<h6>"+sectionString+
                    "<a class='btn btn-primary btn-sm ml-2 mr-2' data-toggle='collapse' href='#"+editOptionsId+"' role='button' aria-expanded='false' aria-controls='editOptions01' id='"+selectorButtonId+"'>"+
                            "Text"+
                            "<span class='badge badge-secondary'>"+
                        "<a class='btn btn-primary btn-sm' data-toggle='collapse' href='#"+collapseMenuId+"' role='button' aria-expanded='false' aria-controls='collapseExampleThree' id='"+selectorButtonDetails+"'>"+
                            "Edit Text"+
                        "</a></span>"+
                        "</h6>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
                "<div class='collapse' id='"+editOptionsId+"'>"+
                "<div class='card card-body mb-4' id='"+fieldSelectorButtonListId+"'>"+
                "<p onClick=updateField('Text','"+sectionId+"','"+selectorButtonId+"','"+selectorButtonDetails+"','"+fieldSelectorButtonListId+"')>Text</p>"+
                "<p onClick=updateField('Image','"+sectionId+"','"+selectorButtonId+"','"+selectorButtonDetails+"','"+fieldSelectorButtonListId+"')>Image</p>"+
                "<p onClick=updateField('Video','"+sectionId+"','"+selectorButtonId+"','"+selectorButtonDetails+"','"+fieldSelectorButtonListId+"')>Video</p>"+
                "</div>"+
                "</div>"+
                "<div class='collapse' id='"+collapseMenuId+"'>"+
                "<div class='card card-body mb-4'>"+
                "<p>Image : 16</p>"+
                "<p>Upload : Button Here</p>"+
                "</div>"+
                "</div>";


               
}

function setLayoutA(panelId){


    var sections = 1;
    var sectionId = panelId +"sec1";

  
    let currentPanelId = getCurrentPanelObject(); 
    let bodyId = currentPanelId.bodyId;
    console.log(bodyId);
    // DYNAMIC CARD BODY NEEDS TO BECOME -- setLayoutA THE uid ??
    $("#"+bodyId).html("<div class='row' style='height: 100%;'>"+
                                    "<div class='col-12' style='border-style:solid;border-color: black;height:100%'>"+
                                    "<div class='row' style='border-style:solid; border-color: darkblue;height: 100%;'>"+
                                        "<div class='col-12 p-0' style='border-style:solid;border-color: red;height:100%' id='"+sectionId+"'>"+

                    "<textarea id='sec1pan1-textarea' name='sec1pan1-textarea' rows='4' cols='50' style='border:1px solid #999999; width:100%;height:100%;padding:15px;'>Schoolio is pretty coolio Mr.Boulio</textarea>"+

                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                
                            "</div>");

    $('#dynamic-fields').html(getFieldString(0,sectionId));
    
        
}

function setLayoutB(panelId){

    var sections = 4;
    var sectionIds = [];
    for(var x=0;x<sections;x++){

        let sectionIdString = panelId+"sec"+(x+1);
        sectionIds.push(sectionIdString);

    }

    $('#'+panelId).html("<div class='row' style='height: 100%;'>"+
                                 "<div class='col-6' style='border-style:solid;border-color: black;height:100%;'>"+
                                 "<div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'>"+
                                 "<div class='col-12 pb-2 pt-2' style='border-style:solid;border-color: black;height:100%;' id='"+sectionIds[0]+"'>"+
                                 textAreaField+
                                 "</div>"+
                                 "</div>"+
                                 "<div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'>"+
                                 "<div class='col-12 pb-2 pt-2' style='border-style:solid;border-color: black;height:100%;' id='"+sectionIds[1]+"'>"+
                                 textAreaField+
                                 "</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'>"+
                                 "<div class='col-12 pb-2 pt-2' style='border-style:solid;border-color: black;height:100%;' id='"+sectionIds[2]+"'>"+
                                 textAreaField+
                                 "</div></div></div><div class='col-6' style='border-style:solid;border-color: black;height:100%;'>"+
                                 "<div class='row' style='border-style:solid; border-color: green;height: 100%;'>"+
                                 "<div class='col-12 pb-2 pt-2' style='border-style:solid;border-color: black;height:100%;' id='"+sectionIds[3]+"'>"+
                                 textAreaField+
                                 "</div></div></div></div>");

                                 $('#dynamic-fields').html(getFieldString(0,sectionIds[0]));

                                 for(var x = 1; x<sections; x++){
                                    console.log('geee')
                                     $('#dynamic-fields').append(getFieldString(x, sectionIds[x]));
                                 }
}

function setLayoutC(panelId){

    $('#'+panelId).html("<div class='row' style='height: 100%;'><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 50%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 50%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div><div class='col-6' style='border-style:solid;border-color: black;'><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test A</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test B</div></div><div class='row' style='border-style:solid; border-color: darkblue;height: 33.333%;'><div class='col-12' style='border-style:solid;border-color: black;'>Test C</div></div></div></div>");
    var sections = 5;
    
    $('#dynamic-fields').html(getFieldString(1));
    
    for(var x = 1; x<sections; x++){
        $('#dynamic-fields').append(getFieldString(x+1));
    }

}


/**
 *  args@ String: newType, ex - Text, Image, List, Video
 *  args@ String: currentType, ex - Text, Image, List, Video
 *  args@ Button Id: Id for dynamic Field Selector Button  ex : selectorButton-ID
 *  args@ Button Id: Id for dynamic Field Selector Details Button ex : selectorButtonDetails-ID
 */ 
function updateField(newType,dynamicFieldArea, selectorButtonId, selectorButtonFieldDetailsId, buttonList){

    const types = ["Text", "Image", "Video", "List"];


    console.log('Here');

    $('#'+selectorButtonId).html(newType);
    $('#'+selectorButtonFieldDetailsId).html("Edit "+newType);
    
    $('#'+buttonList).html("");
    
    for(var x=0;x<types.length;x++){
        if(types[x] != newType){
            $('#'+buttonList).append("<p onClick=updateField('"+types[x]+"','"+dynamicFieldArea+"','"+selectorButtonId+"','"+selectorButtonFieldDetailsId+"','"+buttonList+"')>"+types[x]+"</p>");
        }
    }
  
    switch(newType) {
        case "Text":
          // code block
          $('#'+dynamicFieldArea).html(textAreaField);
          break;
        case "Image":
          // code block
          $('#'+dynamicFieldArea).html(imageField);
          break;
        case "Video":
        // code block
           $('#'+dynamicFieldArea).html(videoField);
           break;
        case List:
            // code block
            $('#'+dynamicFieldArea).html(textAreaField);
    
            break;
        default: 
            $('#'+dynamicFieldArea).html(textAreaField);
      }

}


/// HEADER AND FOOTER INPUT 

function headerInput(headerInputTagId){

    let currentPanelId = getCurrentPanelObject(); 
    let currentHeaderInput = document.getElementById(headerInputTagId);
    let headerId = currentPanelId.headerId;
    $("#"+headerId).html(currentHeaderInput.value);

}

function footerInput(footerInputTagId){

    let currentPanelId = getCurrentPanelObject(); 
    let currentFooterInput = document.getElementById(footerInputTagId);
    let footerId = currentPanelId.footerId;
    $("#"+footerId).html(currentFooterInput.value);


}