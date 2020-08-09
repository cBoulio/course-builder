/**
 * 
 *  Creating Mods -  
 *     1. Get DynamicModList - nav bar in purple background   
 *     2. Add a new mod to the list
 *     3. Get List for that Mod --- 
 */
var currentModIndex = 0;
var currentPanelIndex = 0;

const modList = document.getElementById('dynamicModList');

const course = {
    "id":123,
    "name":'Test Course',
    "mods":[]
};

$(function() { 

    const uniqueModId = 'mod'+(course.mods.length);
    const panelListId = 'panelList'+(course.mods.length);

    const headerString = 'Mod '+(course.mods.length+1)+" Header 1";
    const footerString = 'Mod '+(course.mods.length+1)+" Footer 1";

    const defaultMod = {
        "id":uniqueModId,
        "name":"default",
        "active":true,
        "panelListId":panelListId,
        "panels":[]  
    }

    course.mods.push(defaultMod);
    // sets a default list - -- 
    $(dynamicMainBody).append("<div class='col-12 p-0 mt-0 active-panel'  id='"+panelListId+"'></div>");    
    // add a default panel to the screen -  - - - - -  -

    createPanel(defaultMod);

 });


 //////////////////////////////////////////////////
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft")        leftMod()
    else if (e.code === "ArrowRight") rightMod()
    else if (e.code === "ArrowUp") scrollUp()
    else if (e.code === "ArrowDown") scrollDown()
});

$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
        scrollUp()
    }
    else {
        scrollDown()
    }
});
////////////////////////////////////////////////////


////////////////////////////////////////////
function createMod(){

    const uniqueModId = 'mod'+(course.mods.length);
    const panelListId = 'panelList'+(course.mods.length);
    
    const headerString = 'Mod '+(course.mods.length+1)+" Header 1";
    const footerString = 'Mod '+(course.mods.length+1)+" Footer 1";

    const mod = {
        "id":uniqueModId,
        "name":"default",
        "active":false,
        "panelListId":panelListId,
        "panels":[]
    }   
    
    course.mods.push(mod);


    $(dynamicModList).append("<li class='nav-item  m-1'>"+
                                "<button class='nav-link btn btn-warning' onClick=changeMods('"+mod.id+"') id="+mod.id+">Mod-"+(course.mods.length)+"</button>"+
                             "</li>");
    
    $(dynamicMainBody).append("<div class='inactive-panel' id='"+panelListId+"'></div>"); 


    createPanel(mod)

                         
}

function createPanel(mod){

    let currentMod;
    if(mod != undefined){
        currentMod = mod;
    }else{
        currentMod = getCurrentMod();
    }
    let uniquePanelId = currentMod.panelListId+'pan'+(currentMod.panels.length+1);

    let panelHeaderIdString = uniquePanelId+"Header";
    let panelBodyIdString = uniquePanelId+"Body";
    let panelFooterIdString = uniquePanelId+"Footer";
    
    let panel = {
        "id":uniquePanelId,
        "headerId":panelHeaderIdString,
        "bodyId":panelBodyIdString,
        "footerId":panelFooterIdString,
        "sections":1,
        "layout":"default",
    }
  
    currentPanelIndex = 0;

    for(let x=0; x<course.mods.length;x++){
        
        if(course.mods[x].id == currentMod.id){
            course.mods[x].panels.push(panel);
            currentPanelIndex =   course.mods[x].panels.length-1;
          
            addNewPanelToList(x,panel); 
        }
    }
}   

function addNewPanelToList(modIndex,panel){
    
    let headerPlaceholder = "Mod "+(modIndex+1)+" Header "+(course.mods[modIndex].panels.length);
    let footerPlaceholder = "Mod "+(modIndex+1)+" Footer "+(course.mods[modIndex].panels.length);

 
    $("#"+course.mods[modIndex].panelListId).append("<div class='card m-4 p-0' style='height: 95%;' id='"+panel.id+"'>"+
                        "<div class='card-header pl-2 pt-4 pb-0' style='border-style:solid;height:10%'>"+
                        "<h5 class='card-title' id='"+panel.headerId+"'>"+headerPlaceholder+"</h5>"+
                        "</div>"+
                        "<div class='card-body' style='border-style:solid; border-color: brown;height:100%;' id='"+panel.bodyId+"'></div>"+
                        "<div class='card-footer p-2' style='border-style:solid;padding: 0;margin: 0;height:6%'>"+
                        "<h5 class='card-title' id='"+panel.footerId+"'>"+footerPlaceholder+"</h5>"+
                        "</div>"+
                        "</div>");
    

                        //////////
    scrollTo(course.mods[modIndex].panels[currentPanelIndex].id);    
}


function changeMods(modId){

    $(dynamicModList).html("");
    for(var x=0; x<course.mods.length; x++){

        if(course.mods[x].id == modId){
      
            $(dynamicModList).append("<li class='nav-item active  m-1'>"+
                                        "<button class='nav-link btn btn-primary' onClick=changeMods('"+course.mods[x].id+"') id="+course.mods[x].id+">Mod-"+(x+1)+"</button>"+
                                     "</li>");
            currentModIndex = x;

        }else{  
        
            $(dynamicModList).append("<li class='nav-item m-1'>"+
                                        "<button class='nav-link btn btn-warning' onClick=changeMods('"+course.mods[x].id+"') id="+course.mods[x].id+">Mod-"+(x+1)+"</button>"+
                                     "</li>");
        }
    }
    showPanelList(currentModIndex);

}


/// KEY FUNCTIONS FOR ARROWS --- 
function leftMod(){
    if(currentModIndex != 0){
        currentModIndex = currentModIndex - 1;
        let modIdString = 'mod'+currentModIndex;
        changeMods(modIdString);
    }
   
}

function rightMod(){
    if(currentModIndex != course.mods.length-1){
        currentModIndex = currentModIndex + 1;
        let modIdString = 'mod'+currentModIndex;
        changeMods(modIdString);
    }
   
}     

function scrollUp(){

    console.log('Scrolled Up Current Panel Index '+currentPanelIndex);  

    if(currentPanelIndex == 0 && course.mods[currentModIndex].panels.length == 0){
        console.log('Here scroll up all the way')
        $(course.mods[currentModIndex].panels[0]).scrollTop(0); 
        $(currentHeaderTicker).html("Header - "+currentPanelIndex);
        $(currentPanelTicker).html("Panel Index - "+currentPanelIndex);
        $(currentFooterTicker).html("Footer - "+currentPanelIndex);

    }else if(currentPanelIndex == 1){
      
        scrollTo(course.mods[currentModIndex].panels[currentPanelIndex].id);
        let indexTicker = 1;
        $(currentHeaderTicker).html("Header - "+currentPanelIndex);
        $(currentPanelTicker).html("Panel Index - "+currentPanelIndex);
        $(currentFooterTicker).html("Footer - "+currentPanelIndex);

    }else{
        
        scrollTo(course.mods[currentModIndex].panels[currentPanelIndex].id);
        $(currentHeaderTicker).html("Header - "+currentPanelIndex);
        $(currentPanelTicker).html("Panel Index - "+currentPanelIndex);
        $(currentFooterTicker).html("Footer - "+currentPanelIndex);
 
    }
    
    if(currentPanelIndex != 0){
        currentPanelIndex = currentPanelIndex-1;
    }
    
}

function scrollDown(){
    
    scrollTo(course.mods[currentModIndex].panels[currentPanelIndex+1].id);
    currentPanelIndex += 1;
    let indexTicker = currentPanelIndex+1;
    $(currentHeaderTicker).html("Header - "+indexTicker);
    $(currentPanelTicker).html("Current Panel - "+indexTicker);
    $(currentFooterTicker).html("Footer - "+indexTicker);

}

function showPanelList(currentModIndex){
    
    var panelIdString = 'panelList'+currentModIndex;
    var activePanel = document.getElementsByClassName('col-12 p-0 mt-0 active-panel');
    
    console.log(currentModIndex)
    for(var x=0;x<activePanel.length;x++){
        
        $('#'+activePanel[x].id).removeClass('col-12 p-0 mt-0 active-panel').addClass('inactive-panel');
            
    }
    
    $('#'+panelIdString).removeClass('inactive-panel').addClass('col-12 p-0 mt-0 active-panel');
          
}

// Mod Functions and stuff = = = == = = = == = 
function printMods(){
    console.log(JSON.stringify(course.mods))
} 
function printCurrentMod(){
    console.log("Current(Active) Mod = "+ course.mods[currentModIndex].id);
}
/**
 * Returns a Mod Object --- 
 */
function getCurrentModId(id){
    var mod;
    if(id = 'undefined'){
        mod =  course.mods[currentModIndex];
    }else{
        mod =   course.mods[id];
    }
    return mod;
}

function getCurrentMod(){
    
    return course.mods[currentModIndex];
 
}

function scrollTo(panelId) {
    console.log(panelId)
    document.getElementById(panelId).scrollIntoView(); 
};
// Mod Functions and stuff = = = == = = = == = 

