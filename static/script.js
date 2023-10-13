




get2019();

function get2019(){
    httpRequest= new XMLHttpRequest();
        httpRequest.open('GET','/api/analyse2019');
        httpRequest.onreadystatechange=doafficher;
        httpRequest.send();
}
function get2020(){
    
    httpRequest= new XMLHttpRequest();
        httpRequest.open('GET','/api/analyse2020');
        httpRequest.onreadystatechange=doafficher;
        httpRequest.send();
}
function get2021(){
    httpRequest= new XMLHttpRequest();
        httpRequest.open('GET','/api/analyse2021');
        httpRequest.onreadystatechange=doafficher;
        httpRequest.send();
}


function doInsertRowTable(annee,matricule,nom,prenom,sexe,specialite,moyenne){
	
	const table = document.getElementsByTagName("table")[0];
	
	row = document.createElement("tr");

	row.setAttribute("class", "row");
	
	col1 = document.createElement("td");
	col2 = document.createElement("td");
	col3 = document.createElement("td");
	col4 = document.createElement("td");
	col5 = document.createElement("td");
	col6 = document.createElement("td");
    col7 = document.createElement("td");
	
	col1.innerText = annee;
	col2.innerText = matricule;
	col3.innerText = nom;	
	col4.innerText = prenom;
    col5.innerText = sexe;
    col6.innerText = specialite;
    col7.innerText = moyenne;

	col1.setAttribute("class", "col_number");
	col2.setAttribute("class", "col_text");	
	col3.setAttribute("class", "col_text");
	col4.setAttribute("class", "col_text");	
	col5.setAttribute("class", "col_text");	
	col6.setAttribute("class", "col_text");	
    col7.setAttribute("class", "col_number");

	row.append(col1);
	row.append(col2);
	row.append(col3);
	row.append(col4);
	row.append(col5);	
	row.append(col6);
    row.append(col7);

	table.append(row);
    
}

function doafficher(){
	const table =document.getElementsByTagName("table")[0];
	let rows = document.querySelectorAll('.row');

	rows.forEach(row => {row.remove();})
	
	

	if(httpRequest.readyState===XMLHttpRequest.DONE){
		if(httpRequest.status==200){
				reponse=httpRequest.responseText;
				resultats=JSON.parse(reponse);
			
				for(resultat of resultats){
                    doInsert(resultat.annee,resultat.matricule,resultat.nom,resultat.prenom,resultat.sexe,resultat.specialite,resultat.moyenne);
					// doInsertRowTable(resultat.annee,resultat.matricule,resultat.nom,resultat.prenom,resultat.sexe,resultat.specialite,resultat.moyenne);
				}
		}
		else{
			alert('petit soucis');
		}
	}
}
function doInsert(annee,matricule,nom,prenom,sexe,specialite,moyenne){	

				
	doInsertRowTable(annee,matricule,nom,prenom,sexe,specialite,moyenne);		

}
