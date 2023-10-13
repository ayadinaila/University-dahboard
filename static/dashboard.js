loadData();

function loadData(){	
	
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/datacourbe');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
		    update_courbes(jsonData1);			
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/databar');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
		    update_bar(jsonData2);			
		}
	};
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/datapie');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
			// update_Bars(jsonData1);
		    update_pie(jsonData3);			
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/datadoublebar');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
			// update_Bars(jsonData1);
		    update_doublebar(jsonData4);			
		}
	};
	httpRequest4.send();

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/dataDoughnut');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest.status === 200) {
			jsonData5 = JSON.parse(httpRequest5.response);
		    update_doughnut(jsonData5);			
		}
	};
	httpRequest5.send();
	
}

function update_courbes(jsonData){
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=3;
		d.radius=1;		
		
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: data
    },
    options: {
		responsive: false,
		scales: {
			yAxes: [{
				ticks: {
					fontColor: "#E8C4C4",
					borderColor:"#E8C4C4",
					fontSize:14
				},
				
				gridLines: {
					color: "rgba(0, 0, 0, 0)",
					drawBorder: false,
					lineWidth: 0,
					display: false
				}
			}],
			xAxes: [{
				ticks: {
					fontColor: "#E8C4C4",
					 beginAtZero: true,
					 fontSize:14
				},
				gridLines: {
					color: "rgba(0, 0, 0, 0)",
					drawBorder: false,
					lineWidth: 0,
					display: false
				}
			}]
		},
      title: {
        display: true,
        text: 'Nombres des étudiants par spécialité dans chaque année',
		fontSize:16,
		fontColor:"#E8C4C4"

      },
	  legend:{
		position:'bottom',
		
		labels:{
			fontColor:"#E8C4C4",
			
		}
	}

    }

  });
  ;
}


function update_bar(jsonData){
	
	var labels = jsonData[0].label;

	 console.log(labels);
	 
	 var data= jsonData[0].nbr;
	 console.log(data);
	 new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "étudiants(année)",
			  data: data,
			  backgroundColor: [
				'rgba(255, 99, 132, 0.5)',
				'rgba( 	232	,196	,196,0.6) ',
				'rgba(153, 102, 255, 0.5)'
			  ],
			  borderColor: [
				'rgb(255, 99, 132)',
				'rgba( 	232	,196	,196) ',
				'rgb(153, 102, 255)'
			  ],
			  borderWidth: 2,
			 
			}
		  ]
		},
		options: {
			responsive:false,
			scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#E8C4C4",
                        beginAtZero: true,
						fontSize:14

                    },
					
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
						drawBorder: false,
						display: false
					}
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#E8C4C4",
                        beginAtZero: true,
						fontSize:14
						
                    },
					
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
						drawBorder: false,
						display: false
					}
                }],
				
            },
		  legend: { display: false },
		  title: {
			display: true,
			text: 'Nombre des étudiants par années',
			fontColor:"#E8C4C4",
			fontSize:14
		  },
		  labels:{
			fontColor:"#E8C4C4"
		}
		}
	});
}

function update_pie(jsonData){
	var labels = jsonData.map(function(e) {
		return e.label;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.data;
	 });
	 console.log(labels);
	 new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
			label: "Homme et femme (années)",
			backgroundColor: ["  rgba(249, 181, 208,0.8)", "rgba(130, 170, 227,0.8)"],
			data: data,
			borderColor:["  rgb(249, 181, 208)", "rgb(130, 170, 227)"],
			borderWidth:2
		  }]
		},
		options: {
			responsive:false,
		  title: {
			display: true,
			text: 'Répartition des femmes et hommes pendant toutes les années',
			fontColor:"#E8C4C4",
			fontSize:16
		  },
		  legend: { display: true,
			position: 'bottom',
			labels:{
				fontColor:"#E8C4C4"
			}},

			
		 
			
		}
	});
	
}

function update_doublebar(jsonData){
	var labels = jsonData.years;

	var data = jsonData.datasets;
	console.log(data);
	new Chart(document.getElementById("bar-chart-grouped"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Passants",
			  backgroundColor: "rgba(255, 220, 169,0.5)",
			  borderColor:"rgb(255, 220, 169)",
			  borderWidth:2,
			  data: data[0].passants
			},
			{
				label: "Doublons",
				backgroundColor: "rgba(250, 171, 120,0.5)",
				borderColor:"rgb(250, 171, 120)",
				borderWidth:2,
				data: data[0].doublants
			  },
		  ]
		},
		options: {
			responsive:false,
		  title: {
			display: true,
			text: 'Nombre de passants et doublans par annee',
			fontColor:"#E8C4C4",
			fontSize:12
		  },
		  legend: { display: true,
			position: 'bottom',
			labels:{
				fontColor:"#E8C4C4"
			}},
			scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#E8C4C4",
                        beginAtZero: true,
						fontSize:12

                    },
					
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
						drawBorder: false,
						display: false
					}
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#E8C4C4",
                        beginAtZero: true,
						fontSize:12
						
                    },
					
					gridLines: {
						color: "rgba(0, 0, 0, 0)",
						drawBorder: false,
						display: false
					}
                }],
				
            },
		}
	});
	
}


function update_doughnut(jsonData){
	var labels = jsonData[0].label;
	var data=jsonData[0].data;

	console.log(labels);
	console.log(data);
	console.log(jsonData);
	new Chart(document.getElementById("doughnut-chart"), {
		type: 'doughnut',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "Nombre de réussite par spécialité",
			  backgroundColor: ["rgba(255, 220, 169,0.8)", " rgba(249, 181, 208,0.8)","rgba(130, 170, 227,0.8)","rgba(250, 171, 120,0.8)","rgba(153, 102, 255, 0.8)","rgba( 	232	,196	,196,0.8) ","rgba(255, 99, 132, 0.8)"],
			  borderColor:["rgb(255, 220, 169)","rgb(249, 181, 208)","rgb(130, 170, 227)","rgb(250, 171, 120)","rgb(153, 102, 255)","rgba( 	232	,196	,196)","rgb(255, 99, 132)"],
			  data: data
			}
		  ]
		},
		options: {
			cutoff:'60%',
			responsive:false,
		  title: {
			display: true,
			text: 'Réussite par spécialité de toutes les années',
			fontColor:"#E8C4C4",
			fontSize:14
		  },
		  legend: { display: true,
			position: 'bottom',
			labels:{
				fontColor:"#E8C4C4"
			}},
			
		}
	});
	
}
