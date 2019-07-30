// Criando scatterplot
function scatterplot_1(dataset){
	dataset.then(function(data) {

	// Margens
	var margin = {top: 30, right: 30, bottom: 50, left: 60};

	//Tamanho do svg
	var h = 350
	var w = 400

	//Tamanho do grafico
	var height = h - margin.top - margin.bottom;
	var width = w - margin.left - margin.right;

	// Criando svg
	var svg = d3.select("#dispersion")
	  .append("svg")
	  .attr("width",w)
	  .attr("height",h)
	  .append("g")
	  .attr('id','scatterplot_1')
	  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

	// Converte valores para numerico
	data.forEach(function(d) {
		d['psp'] = +d['psp'];
		d['pse'] = +d['pse'];
		d['pspf'] = +d['pspf'];
	});

	// Funcoes para retornar os valores dos dados
	var xValue = function(d) { return d['psp'];};
	var yValue = function(d) { return d['pse'];};

	//Scale x
	x_scatterplot_1 = d3.scaleLinear()
		.domain([d3.min(data,xValue)-0.15, d3.max(data,xValue)+0.15])
		.range([ 0, width]);

	//Scale y
	y_scatterplot_1 = d3.scaleLinear()
		.domain([d3.min(data,yValue)-0.15, d3.max(data,yValue)+0.15])
		.range([ height, 0]);

	// Eixos
	var xAxis = d3.axisBottom().scale(x_scatterplot_1);
	var yAxis = d3.axisLeft().scale(y_scatterplot_1);

	// Adicionando eixos x e y
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	svg.append("g")
		.call(yAxis);

	// Desenhnando pontos
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function (d) { return x_scatterplot_1(d['psp']); } )
		.attr("cy", function (d) { return y_scatterplot_1(d['pse']); } )
		.attr('class','point')
		.attr("r", function(d){return 4});

	// Desenhnado labels
	svg.append('text')
		.attr('x',width/2)
		.attr('y',height+35)
		.attr('font-size','15px')
	  	.attr('font-family','Helvetica')
		.text('PSP');
	svg.append('text')
		.attr('x',0)
		.attr('dx',-55)
		.attr('y',height/2)
		.attr('font-size','15px')
	  	.attr('font-family','Helvetica')
		.text('PSE');

	});
}