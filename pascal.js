
function generateTriangle(totalLines) {

	var Triangle = (function () {
		function Triangle() {



			this.prepMatrix = function() {
				var matrix = [];
				for (var line = 0; line < totalLines; line++) {
					matrix[line] = [];
					for (var element = 0; element <= line; element++) {
						matrix[line][element] = 1;
					}
				}
				return matrix;
			};

			this.calcValues = function(matrix) {
				for (var line = 0; line < totalLines; line++) {
					if (matrix[line].length > 2) {
						for (var element = 0; element <= line; element++) {
							if (element > 0 &&
								element < line) {
								
								var leftParent = matrix[line-1][element-1];
								var rightParent = matrix[line-1][element];
								var value = leftParent + rightParent;
								matrix[line][element] = value;

							}
						}
					}
				}
				return matrix;				
			}


			this.matrix = [];
			this.matrix = this.prepMatrix(totalLines);
			this.matrix = this.calcValues(this.matrix);


		}
		return Triangle;
	})();

	return new Triangle();
}



var render = function(matrix) {
	var renderRow = function (row) {

		var template = "<p class='wrap'>";

		for (var q = 0; q < row.length; q++) {
			template += "<span class='badge'>" + row[q] + "</span>";
		}

		template += "</p>";

		$("#results").append(template);
	}

	$("#results").empty();

	for (var i = 0; i < matrix.length; i++) {
		renderRow(matrix[i]);
	}
}


$("#form").submit(function( event ) {
	event.preventDefault();

	var input = $('#form :input');
	input = input[0].value;
	if (!isNaN(input)) {

		var triangle = generateTriangle(input);
		render(triangle.matrix);
	

		console.log(triangle.matrix);

	} else {
		//error
		console.log('error!');
	}


});


