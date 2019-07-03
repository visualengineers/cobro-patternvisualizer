var host = "http://127.0.0.1"
var port = "3000"

var adr = host + ":" + port + "/data"

var id = "railwaymap"


//http://127.0.0.1:3000/data/blocks/3040601/svg <- navigation example

//there is a lot of console output in the Browser, if someone wants to add more details in the web-page just show it on screen! the data you want to show is most likely already here.


function getSelectedOption(sel) { //this function returns the currently selected option from a Drop-Down Menu (input:elementID, output: selected option) 
    var opt;
    for (var i = 0, len = document.getElementById(sel).options.length; i < len; i++) {
        opt = document.getElementById(sel).options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

function removeElementsByClass(className){ //this function removes all elements with a specified class (imput: class, output: none, deletes elements)
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    document.documentElement.style                      //reset the size of the expanding div-box "whatwhy"
    .setProperty('--whatwhy-y-size', '53px');
}

//create a select option list with all projects 
    var allprojects = adr + "/projects" //this adress must be used to get a JSON that contains all projekts from the backend

    var parray =                            //this is used to convert the JSON in a for JavaScript usable format
    d3.json(allprojects, function (p){      //p contains the JSON data but can be used as an Array
    console.log(p)

    for ( title in p)                       //for each title in p..
    {
        var newOption = document.createElement("option");               //create an option with the title and add it to the Drop-Down Menu
        newOption.innerHTML = p[title];
        document.getElementById('projectlist').options.add(newOption);
    }

    show_project_title()                                                //this function is called here, because we want to show the first projekt when the site loads
    });


//load the project title
function show_project_title(){                                      //this function had more use in older versions                            
load_project_details(getSelectedOption('projectlist').innerHTML)    //but it is still needed because it is referenced by other functions
}

///////////SHOW MORE!//////////////////////////////////////////////
function load_project_details(projectid){                           //this function will get all the Data from the selected project and shows it in the HTML (input: selected projectID, output: data on screen)


    var url = adr + "/projects/" +projectid;    //this url will be used to get the project data from the backend
    var varsize = 0;                            //this var should help us with scaling issues

    removeElementsByClass('adddiv');            //if we want to switch to another project we need to remove the old data on screen first

    var darray =
    d3.json(url, function (d) {                 //the data we want is in d now

        console.log("id: " + d.id)

        var url1 =  host + ":" + port + "/cobro-data/projects/" + d.id + "/pic1.png"    //this is the url for the preview picture

        console.log("title: " + d.title)
        document.getElementById('title').innerHTML = d.title                            //the div named title will now containt the title

        console.log("constructionplan id: " + d.constructionplan.id)

        for (i in d.constructionplan.pattern){                                          //this is a huge loop that contains other loops. 
            console.log("pattern id: " + d.constructionplan.pattern[i].id)              //this will get us all the data
                                                                                        //if it is hard to understand please take a look at the result that your browser will return when you open the first url that is mentioned in this function (the var is called url)
            for (ii in d.constructionplan.pattern[i].what){
                console.log("what id: "+ d.constructionplan.pattern[i].what[ii].id)
                console.log("what name: "+ d.constructionplan.pattern[i].what[ii].name)
                console.log("what parent: "+ d.constructionplan.pattern[i].what[ii].parent)

                var div = document.createElement("div");                            //a div with a custom style is created here
                    div.className = "adddiv";
                    div.style.background = "white";
                    div.style.color = "#B46E6E";
                    div.innerHTML = d.constructionplan.pattern[i].what[ii].name;    //the data will be shown in the div


                    var wwsize = getComputedStyle(document.documentElement)                        //this codeblock is used to change the size of
                    .getPropertyValue('--whatwhy-y-size');                                          //the div called 'whatwhy'                      
                    var intwwsize = parseInt(wwsize) + 15;                                           //+15px per element               
                    wwsize = intwwsize+'px';                                                       //the conversion stuff is used to work arround the fact, that
                    document.documentElement.style                                                  //the size is zb.: 24px not 24 -> we need to convert string-int-string
                    .setProperty('--whatwhy-y-size', wwsize);                                       //note that 24px will return 24 when parsed as int (-> parseInt() documentation)

    varsize = varsize + 1;
                    
                 document.getElementById("what").appendChild(div);                  //add the div inside the Element with the ID "what"

            }

            for (iii in d.constructionplan.pattern[i].why){                             //same pattern for "why" and "how" //more loops and divs
                console.log("why id: "+ d.constructionplan.pattern[i].why[iii].id)
                console.log("why name: "+ d.constructionplan.pattern[i].why[iii].name)
                console.log("why parent: "+ d.constructionplan.pattern[i].why[iii].parent)

                var div = document.createElement("div");
                div.className = "adddiv";
                div.style.background = "white";
                div.style.color = "#718E32";
                div.innerHTML = d.constructionplan.pattern[i].why[iii].name;

                document.getElementById("why").appendChild(div);
                
            }

            var how_col_1 = 0;
            var how_col_2 = 0;

            for (iiii in d.constructionplan.pattern[i].how){
                console.log("how id: "+ d.constructionplan.pattern[i].how[iiii].id)
                console.log("how name: "+ d.constructionplan.pattern[i].how[iiii].name)
                console.log("how parent: "+ d.constructionplan.pattern[i].how[iiii].parent)



                var div = document.createElement("div");
                    div.className = "adddiv adddivhow";
                    div.id = "how";
                    div.style.background = "white";
                    div.style.color = "#3B5F5B";

                   // div.innerHTML = d.constructionplan.pattern[i].how[iiii].name;
                   var howpicurl = host + ":" + port + "/cobro-data/_assets/icons/icon_" + d.constructionplan.pattern[i].how[iiii].id + ".png";
                   div.innerHTML = '<img src="' + howpicurl + '" height="60" width="60"/>';

                   if ( d.constructionplan.pattern[i].how[iiii].id <= 3050000) {
                    how_col_1++
                    document.documentElement.style.setProperty('--how-table-columns-1', how_col_1);
                    document.getElementById("how-wrapper-1").appendChild(div);
                    }
                    else {
                        how_col_2++
                        document.documentElement.style.setProperty('--how-table-columns-2', how_col_2);
                        document.getElementById("how-wrapper-2").appendChild(div);
                    }

            }

        }
        console.log("context: " + d.context)

        for (i in d.thumbnail){
            console.log("thumbnail: " + d.thumbnail[i])
           // document.getElementById('pic1').innerHTML = '<img src="' + url1 + '" height="189" width="336"/>';
            document.documentElement.style.setProperty('--thumbnail', 'url("' + url1 + '")');

        }

        var scaling = 0;                                                                    //make sure that it looks nice...
console.log(varsize);
if (varsize > 2){scaling =+ 50}     //

        var wwsize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--whatwhy-y-size'));
        var wheight = parseInt(document.getElementById('container').clientHeight);            //get Height from the big divs in table
        var wwHeight = parseInt(document.getElementById('whatwhy').clientHeight);
        var hHeight = parseInt(document.getElementById('how').clientHeight);
        var tHeight = parseInt(document.getElementById('title').clientHeight);

        var imgHeight = (wheight - (tHeight + wwHeight + hHeight))*1.65 - scaling;           //size img to take more or less space,
        imgHeight = imgHeight + 'px';                                                       //(to fix problems with expanding 'whatwhy' div)
                                                                                            //the factor 1.6 should fix the math (approx.)
        document.documentElement.style.setProperty('--img-min-Height', imgHeight);          


        console.log("domain: " + d.domain)

        console.log("author: " + d.author)

        console.log("URL: " + d.URL)

        console.log("editor: " + d.editor)

    });

}
