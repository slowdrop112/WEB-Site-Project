const express = require("express"); /*da require la biblioteca "express" */
const fs= require('fs');
const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');


app= express();
console.log("Folder proiect", __dirname); /*folderul aplicatiei */
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd()); /*current work directory, folderul de unde rulam */

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.get("/cerere", function(req,res){
    res.send("<b>Hello!</b> <span style='color :red'> world!</span>"); //trimiterea unui mesaj fix
})
app.get("/data", function(req,res){
    res.send(new Date()); //trimiterea unui mesaj dinamic, in cazul asta data curenta
})

app.get("/suma/:a/:b", function(req,res){
    var suma=parseInt(req.params.a)+parseInt(req.params.b)
    res.send("suma este"+" "+suma); 
})

app.get("/data1", function(req,res, next){
    res.write("Data: "); 
    next();
});
app.get("/data1", function(req,res){
    res.write(""+new Date());
    res.end();

});
//write si send sa am mereu string



function initErori(){
 var continut= fs.readFileSync(path.join(__dirname, "resurse/json/erori.json")).toString("utf-8");
 console.log(continut);

}

initErori()





function compileazaScss(caleScss, caleCss){
    console.log("cale:",caleCss);
    if(!caleCss){

        let numeFisExt=path.basename(caleScss);
        let numeFis=numeFisExt.split(".")[0]   /// "a.scss"  -> ["a","scss"]
        caleCss=numeFis+".css";
    }
    
    if (!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss )
    if (!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss )
    

    let caleBackup=path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup)) {
        fs.mkdirSync(caleBackup,{recursive:true})
    }
    
    // la acest punct avem cai absolute in caleScss si  caleCss
    //TO DO
    let numeFisCss=path.basename(caleCss);
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css",numeFisCss ))// +(new Date()).getTime()
    }
    rez=sass.compile(caleScss, {"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    //console.log("Compilare SCSS",rez);
}
//compileazaScss("a.scss");
vFisiere=fs.readdirSync(obGlobal.folderScss);
for( let numeFis of vFisiere ){
    if (path.extname(numeFis)==".scss"){
        compileazaScss(numeFis);
    }
}


fs.watch(obGlobal.folderScss, function(eveniment, numeFis){
    console.log(eveniment, numeFis);
    if (eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss, numeFis);
        if (fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})





app.listen(8080);
/*app listen la portul 8080 */
console.log("Serverul a pornit");