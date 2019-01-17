var PM25_WARNING_LVL = 37; 	
var PM25_DANGER_LVL = 85; 	
var PM10_WARNING_LVL = 61; 	
var PM10_DANGER_LVL = 141; 	
var BAD = "zły";
var SUFFICENT = "dostateczny";
var GOOD = "dobry";
	
$(document).ready(function () {
	setLegend();
	
	$.get("http://szpek.pl/api/", function(data) {
		//124 = 24 to chart + 100 to table - data ordered by date desc
			data = round_smog_values(data);
			var chartData = data.slice(0,24);
			var tableData = data.slice(24, 124);
			setLastHourValues(data[0]);
			createCharts(chartData);
			fillTables(tableData);
		})
		.fail(function() {
			alert( "Nie mogę pobrać danych. Jeśli problem pojawi się ponownie - napisz do mnie" );
		})
});

//bootrap tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function setLegend() {
	var dotGoodText = document.getElementById('dotGoodText')
	dotGoodText.innerHTML = GOOD;
	$(dotGoodText).css('color', 'green');
	var dotSufficentText = document.getElementById('dotSufficentText')
	dotSufficentText.innerHTML = SUFFICENT;
	$(dotSufficentText).css('color', 'orange');
	var dotBadText =  document.getElementById('dotBadText')
	dotBadText.innerHTML = BAD;
	$(dotBadText).css('color', 'red');
}

function setLastHourValues(last_datum){
	document.getElementById('pm25LastHour').innerHTML = getHourAndMinute(last_datum.Execution_timestamp);
	document.getElementById('pm25SmogLevel').innerHTML = last_datum.Pm25_value + " μg/m3";
	var pm25AirQuality = document.getElementById('pm25AirQuality');
	pm25AirQuality.innerHTML = set_pm25_air_quality(last_datum.Pm25_value);
	$(pm25AirQuality).css('color', set_pm25_chart_colors([last_datum.Pm25_value])[0]);
	
	document.getElementById('pm10LastHour').innerHTML = getHourAndMinute(last_datum.Execution_timestamp);
	document.getElementById('pm10SmogLevel').innerHTML = last_datum.Pm10_value + " μg/m3";
	var pm10AirQuality = document.getElementById('pm10AirQuality');
	pm10AirQuality.innerHTML = set_pm10_air_quality(last_datum.Pm10_value);
	$(pm10AirQuality).css('color', set_pm10_chart_colors([last_datum.Pm10_value])[0]);
}

function round_smog_values(data){
	for (var i=0; i< data.length; i++){
		data[i].Pm25_value = Math.round(data[i].Pm25_value * 100) / 100;
		data[i].Pm10_value = Math.round(data[i].Pm10_value * 100) / 100;
	}
	
	return data;
}

function set_pm25_air_quality(pm25_value){
	var air_quality_info = "";
	if(pm25_value < PM25_WARNING_LVL){
		air_quality_info = GOOD;
	}
	else if (pm25_value >= PM25_DANGER_LVL){
		air_quality_info = BAD;
	}
	else {
		air_quality_info = SUFFICENT;
	}
	
	return air_quality_info;
}

function set_pm10_air_quality(pm10_value){
	var air_quality_info = "";
		var color = "";
		if(pm10_value < PM10_WARNING_LVL){
			air_quality_info = GOOD;
		}
		else if (pm10_value >= PM10_DANGER_LVL){
			air_quality_info = BAD;
		}
		else {
			air_quality_info = SUFFICENT;
		}
	
	return air_quality_info;
}


function set_pm25_chart_colors(pm25_values){
	var pm25_colors = [];
	for(var i = 0; i < pm25_values.length; i++){
		var color = "";
		if(pm25_values[i] < PM25_WARNING_LVL){
			color = "green";
		}
		else if (pm25_values[i] >= PM25_DANGER_LVL){
			color = "red";
		}
		else {
			color = "orange";
		}
		
		pm25_colors[i] = color;
	}
	
	return pm25_colors;
}

function set_pm10_chart_colors(pm10_values){
	var pm10_colors = [];
	for(var i = 0; i < pm10_values.length; i++){
		var color = "";
		if(pm10_values[i] < PM10_WARNING_LVL){
			color = "green";
		}
		else if (pm10_values[i] >= PM10_DANGER_LVL){
			color = "red";
		}
		else {
			color = "orange";
		}
		
		pm10_colors[i] = color;
	}
	
	return pm10_colors;
}

function getHourAndMinute(date){
	var formattedDate = splitDateForIOS(date);
	hour = formattedDate.getHours();
	minute = (formattedDate.getMinutes()<10?'0':'') + formattedDate.getMinutes();
	return hour + ':' + minute;
}

function splitDateForIOS(date) {
	var arr = date.split(/[- :]/);
    return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
}

function createCharts(chartsData){
	//reverse data to show in correct order
	chartsData = chartsData.reverse();
	
	var pm25Chart = document.getElementById("pm25Chart").getContext('2d');
	var pm10Chart = document.getElementById("pm10Chart").getContext('2d');
		
		
	pm25_values = chartsData.map(x => x.Pm25_value);
		
	var chart25 = new Chart(pm25Chart, {
		type: 'bar',
		data: {
			datasets: [{
				label: 'poziom μg/m3',
				data: pm25_values,
				borderWidth: 1,
				backgroundColor: set_pm25_chart_colors(pm25_values)
			}],
			labels: chartsData.map(x => getHourAndMinute(x.Execution_timestamp))

		},
		options: {
			title: {
				display: true,
				text: 'Stan powietrza z ostatnich 24 godzin',
				position: 'bottom'
			},
			responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			},
			tooltips: {
				mode: 'index'
			},
				annotation: {
					annotations: [{
						type: 'line',
						id: 'pm25warningLine',
						mode: 'horizontal',
						scaleID: 'y-axis-0',
						value: PM25_WARNING_LVL, // http://powietrze.gios.gov.pl/pjp/current#
						borderWidth: 2,
						borderColor: 'black',
						label: {
									backgroundColor: "orange",
									enabled: true
							   }
					},
					{
						type: 'line',
						id: 'pm25dangerLine',
						mode: 'horizontal',
						scaleID: 'y-axis-0',
						value: PM25_DANGER_LVL,
						borderWidth: 2,
						borderColor: 'black',
						label: {
									backgroundColor: "red",
									enabled: true
							   }
					}]
				}
			}
		
		});
		
	pm10_values = chartsData.map(x => x.Pm10_value);
		
	var chart10 = new Chart(pm10Chart, {
		type: 'bar',
		data: {
			datasets: [{
				label: 'poziom μg/m3',
				data: pm10_values,
				borderWidth: 1,
				backgroundColor: set_pm10_chart_colors(pm10_values)
			}],
			labels: chartsData.map(x => getHourAndMinute(x.Execution_timestamp))

		},
		options: {
			title: {
				display: true,
				text: 'Stan powietrza z ostatnich 24 godzin',
				position: 'bottom'
			},
			responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			},
			tooltips: {
				mode: 'index'
			},
				annotation: {
					annotations: [{
						type: 'line',
						id: 'pm25warningLine',
						mode: 'horizontal',
						scaleID: 'y-axis-0',
						value: PM10_WARNING_LVL, // http://powietrze.gios.gov.pl/pjp/current# 
						borderWidth: 2,
						borderColor: 'black',
						label: {
									backgroundColor: "orange",
									enabled: true
							   }
					},
					{
						type: 'line',
						id: 'pm25dangerLine',
						mode: 'horizontal',
						scaleID: 'y-axis-0',
						value: PM10_DANGER_LVL,
						borderWidth: 2,
						borderColor: 'black',
						label: {
									backgroundColor: "red",
									enabled: true
							   }
					}]
				}
			}
	});
}

function fillTables(data){
	fillPM25HistoryTable(data);
	fillPM10HistoryTable(data);
};

function fillPM25HistoryTable(data){
	for(var i=0; i < data.length; i++)
	{
		var stateInfoCell = $('<td>');
		stateInfoCell.text(set_pm25_air_quality(data[i].Pm25_value));
		$(stateInfoCell).addClass('text-uppercase');
		$(stateInfoCell).css('color', set_pm25_chart_colors([data[i].Pm25_value])[0]);
		
		var $tr = $('<tr>').append(
            $('<td>').text(data[i].Execution_timestamp),
            $('<td>').text(data[i].Pm25_value + "μg/m3"),
			stateInfoCell
        ).appendTo('#pm25HistoryTable');
	};
}

function fillPM10HistoryTable(data){
	for(var i=0; i < data.length; i++)
	{
		var stateInfoCell = $('<td>');
		stateInfoCell.text(set_pm10_air_quality(data[i].Pm10_value));
		$(stateInfoCell).addClass('text-uppercase');
		$(stateInfoCell).css('color', set_pm10_chart_colors([data[i].Pm10_value])[0]);
		
		var $tr = $('<tr>').append(
            $('<td>').text(data[i].Execution_timestamp),
            $('<td>').text(data[i].Pm10_value + "μg/m3"),
			stateInfoCell
        ).appendTo('#pm10HistoryTable');
	};
}