
window.addEventListener("load", function () {

    document.getElementById("inp-pret").onchange = function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`

    }

    function normalizeString(str) {
        const diacriticsMap = {
            'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
            'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
        };
        return str.replace(/[ăâîșțĂÂÎȘȚ]/g, match => diacriticsMap[match]);
    }

    // document.getElementById("filtrare").addEventListener("click", function(){}
    function filtrareProduse() {
        var inpNume = normalizeString(document.getElemenIdtBy("inp-nume").value.toLowerCase().trim());
        var radioGreutate = document.getElementsByName("gr_rad");
        let inpGreutate;

        for (let rad of radioGreutate) {
            if (rad.checked) {
                inpGreutate = rad.value;
                break;
            }
        }
        let minGreutate, maxGreutate
        if (inpGreutate != "toate") {
            vGreutate = inpGreutate.split(":")
            minGreutate = parseInt(vGreutate[0])
            maxGreutate = parseInt(vGreutate[1])

        }


        var inpPret = parseInt(document.getElementById("inp-pret").value);

        var inpCateg = document.getElementById("inp-categorie").value.toLowerCase().trim();

        const valDescriere = normalizeString(document.getElementById("i_textarea").value.toLowerCase().trim());
        var produse = document.getElementsByClassName("produs");
        let numarProduseVizibile = 0;
        for (let produs of produse) {

            let valNume = normalizeString(produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim()) //am pus produs ca sa se uite doar in subarborele produs, nu in tot documents
            let cond1 = valNume.startsWith(inpNume)

            let valGreutate = parseInt(produs.getElementsByClassName("val-greutate")[0].innerHTML)
            let cond2 = (inpGreutate == "toate" || minGreutate <= valGreutate && valGreutate < maxGreutate);

            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
            let cond3 = (valPret > inpPret)

            let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase().trim() //am pus produs ca sa se uite doar in subarborele produs, nu in tot documents
            let cond4 = (inpCateg == valCategorie || inpCateg == "toate")

            const prodDescriereElement = produs.getElementsByClassName("descriere")[0];
            const prodDescriere = prodDescriereElement ? normalizeString(prodDescriereElement.innerHTML.toLowerCase().trim()) : "";
            const cond5 = (valDescriere === "" || prodDescriere.includes(valDescriere));


            if (cond1 && cond2 && cond3 && cond4 && cond5) {
                produs.style.display = "block";
                numarProduseVizibile++;
            }
            else {
                produs.style.display = "none";
            }
        }
        // Afisează numărul total de produse vizibile
        let numarProduseVizibileElement = document.getElementById('numar-produse-vizibile');
        if (numarProduseVizibileElement) {
            numarProduseVizibileElement.textContent = numarProduseVizibile;
        }

        const mesajFiltrare = document.getElementById("mesaj-filtrare");
        mesajFiltrare.style.display = (numarProduseVizibile === 0) ? "block" : "none";

    }

    document.getElementById("inp-nume").addEventListener("input", filtrareProduse);
    document.getElementById("i_textarea").addEventListener("input", filtrareProduse);
    document.getElementById("inp-pret").addEventListener("input", function () {
        document.getElementById("infoRange").innerHTML = `(${this.value})`;
        filtrareProduse();
    });
    document.getElementById("inp-categorie").addEventListener("change", filtrareProduse);
    const radioGreutate = document.getElementsByName("gr_rad");
    radioGreutate.forEach(radio => {
        radio.addEventListener("change", filtrareProduse);
    });

    var prodinitialOrder = Array.from(document.getElementsByClassName("produs"));

    document.getElementById("resetare").onclick = function () {
        if (confirm("Doriți resetarea filtrelor?")) {

        document.getElementById("inp-nume").value = "";

        document.getElementById("inp-pret").value = document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value = "toate";
        document.getElementById("i_rad4").checked = true;
        document.getElementById("i_textarea").value = "";
        var produse = document.getElementsByClassName("produs");
        document.getElementById("infoRange").innerHTML = "(0)";
        for (let prod of produse) {
            prod.style.display = "block";
        }

        for (let prod of produse) {
            prod.style.display = "block";
        }
        var parentContainer = prodinitialOrder[0].parentNode;
        parentContainer.innerHTML = "";
        for (let prod of prodinitialOrder) {
            parentContainer.appendChild(prod);
            prod.style.display = "block";
        }

    }
    }

    function sorteaza(semn) {
        var produse = document.getElementsByClassName("produs");
        let v_produse = Array.from(produse);
        v_produse.sort(function (a, b) {
            let pret_a = parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
            let pret_b = parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
            if (pret_a == pret_b) {
                let nume_a = a.getElementsByClassName("val-nume")[0].innerHTML;
                let nume_b = b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn * nume_a.localeCompare(nume_b);
            }
            return semn * (pret_a - pret_b);
        });
        for (let prod of v_produse) {
            prod.parentNode.appendChild(prod);
        }
        // După sortare, reordonăm produsele pinuite la început
        var gridProduse = document.querySelector('.grid-produse');
        var pinnedProduse = gridProduse.querySelectorAll('.produs.pinned');
        pinnedProduse.forEach(function (pinnedProdus) {
            gridProduse.insertBefore(pinnedProdus, gridProduse.firstChild);
        });
    }

    // Adăugăm ascultători de evenimente pentru butoanele de sortare
    document.getElementById("sortCrescNume").onclick = function () {
        sorteaza(1);
    }
    document.getElementById("sortDescrescNume").onclick = function () {
        sorteaza(-1);
    }

    window.onkeydown = function (e) {
        if (e.key == "c" && e.altKey) {
            var suma = 0;
            var produse = document.getElementsByClassName("produs");
            for (let produs of produse) {
                var stil = getComputedStyle(produs)  //produs pentru ca pe el il ascundeam sau nu, getcomputedstyle permite verificarea ca fiecare produs este vizibil
                if (stil.display != "none") {
                    suma += parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                }
            }
            if (!document.getElementById("par_suma")) {
                let p = document.createElement("p")
                p.innerHTML = suma;
                p.id = "par_suma";
                container = document.getElementById("produse")
                container.insertBefore(p, container.children[0]) //mai intai primeste nodul de adaugat(p), iar apoi paragraful in fata caruia va fi inserat primul copil
            setTimeout(function(){
                var pgf= document.getElementById("par_suma")
                if (pgf)
                pgf.remove()
            }, 2000) //milisecunde
            }
        }
    }



})

//const inpNume = normalizeString(document.getElementById("inp-nume").value.toLowerCase().trim());






//dupa ce s-a incarcat pagina(din cauza addEventListener),dupa ce s-a incaract evenimentul de dip "load" atunci execta functia
//innerhtml ce este in html--INNER