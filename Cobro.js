var host = "http://127.0.0.1"
var port = "3000"

var adr = host + ":" + port + "/data"

var id = "railwaymap"


//http://127.0.0.1:3000/data/blocks/3040601/svg <- bsp um auf die svg's der elemente zuzugreifen.
//neue backendversion runterladen.





function getSelectedOption(sel) {
    var opt;
    for (var i = 0, len = document.getElementById(sel).options.length; i < len; i++) {
        opt = document.getElementById(sel).options[i];
        if (opt.selected === true) {
            break;
        }
    }
    return opt;
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//create a select option list with all projects 
    var allprojects = adr + "/projects"

    var parray =
    d3.json(allprojects, function (p){
    console.log(p)

    var newOption = document.createElement("option");
    newOption.innerHTML = "select ...";
    document.getElementById('projectlist').options.add(newOption);

    for ( title in p)
    {
        var newOption = document.createElement("option");
        newOption.innerHTML = p[title];
        document.getElementById('projectlist').options.add(newOption);
    }
    });


//load the project title
function show_project_title(){
if ( getSelectedOption('projectlist').innerHTML != "select..." )
load_project_details(getSelectedOption('projectlist').innerHTML)
}

///////////SHOW MORE!//////////////////////////////////////////////
function load_project_details(projectid){


    var url = adr + "/projects/" +projectid;


    removeElementsByClass('adddiv');

    var darray =
    d3.json(url, function (d) {

        console.log("id: " + d.id)

        var url1 =  host + ":" + port + "/cobro-data/projects/" + d.id + "/pic1.png"

        console.log("titel: " + d.titel)
        document.getElementById('title').innerHTML = d.titel

        console.log("constructionplan id: " + d.constructionplan.id)

        for (i in d.constructionplan.pattern){
            console.log("pattern id: " + d.constructionplan.pattern[i].id)

            for (ii in d.constructionplan.pattern[i].what){
                console.log("what id: "+ d.constructionplan.pattern[i].what[ii].id)
                console.log("what name: "+ d.constructionplan.pattern[i].what[ii].name)
                console.log("what parent: "+ d.constructionplan.pattern[i].what[ii].parent)

                var div = document.createElement("div");
                    div.className = "adddiv";
                    div.style.background = "white";
                    div.style.color = "#B46E6E";
                    div.innerHTML = d.constructionplan.pattern[i].what[ii].name;

                 document.getElementById("what").appendChild(div);

            }

            for (iii in d.constructionplan.pattern[i].why){
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

            for (iiii in d.constructionplan.pattern[i].how){
                console.log("how id: "+ d.constructionplan.pattern[i].how[iiii].id)
                console.log("how name: "+ d.constructionplan.pattern[i].how[iiii].name)
                console.log("how parent: "+ d.constructionplan.pattern[i].how[iiii].parent)



                var div = document.createElement("div");
                    div.className = "adddiv adddivhow";
                    div.id = "how";
                    div.style.background = "white";
                    div.style.color = "blue";
                   // div.innerHTML = d.constructionplan.pattern[i].how[iiii].name;
                   var howpicurl = host + ":" + port + "/cobro-data/_assets/icons/icon_" + d.constructionplan.pattern[i].how[iiii].id + ".png";
                   div.innerHTML = '<img src="' + howpicurl + '" height="60" width="60"/>';
                    document.getElementById("container").appendChild(div);

            }

        }
        console.log("context: " + d.context)

        for (i in d.thumbnail){
            console.log("thumbnail: " + d.thumbnail[i])
            document.getElementById('pic1').innerHTML = '<img src="' + url1 + '" height="189" width="336"/>';
        }

        console.log("domain: " + d.domain)

        console.log("author: " + d.author)

        console.log("URL: " + d.URL)

        console.log("editor: " + d.editor)

    });

///////////////////////////////////////////////////////////This loop is used to load all the thumbnails//////////////////////////////////////////////////////////////////
/*
d.thumbnail.forEach(function(entry) {
    console.log(entry);

    var thmb = "https://raw.githubusercontent.com/visualengineers/cobro-data/master/projects/"+ d.id +"/"+ entry

    var myimage = svg.append('image') 	  //svg wird ums bild erweitert 
.attr('xlink:href', thmb)
.attr('width', 250)
.attr('height', 250)
});
*/


}
