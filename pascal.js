
function generateTriangle(totalLines) {

  var Triangle = (function () {

    function Triangle() {
      // public render function
      this.render = function(matrix) {
        // private renderRow function
        var renderRow = function (row, index) {
          // render and append
          var template = "<p class='wrap' id='row" + String(index) + "'>";
          for (var q = 0; q < row.length; q++) {
            template += "&nbsp;<span class='label'>" + row[q] + "</span>&nbsp;";
          }
          template += "</p>";
          $("#results").append(template);

          // positioning
          var containerWidth = $(".container").width();
          var center = containerWidth / 2;
          var rowWidth = $("#row" + index).width();
          var xOffset = index * 1.5;
          var yOffset = center - (rowWidth / 2);
          $("#row" + index).css("top", String(xOffset)+"em")
          $("#row" + index).css("left", String(yOffset)+"px")

          // coloring
          if (index % 2 === 0) {
            // even row
            var middle = Math.floor(row.length / 2) + 1;
            $("#row" + index).children().addClass("label-success");
            $("#row" + index).children( ":nth-child(" + middle + ")" ).addClass("label-danger");

          } else {
            // odd row
            var middleLeft = Math.floor(row.length / 2);
            var middleRight = Math.floor(row.length / 2) + 1;
            $("#row" + index).children().addClass("label-primary");
            $("#row" + index).children( ":nth-child(" + middleLeft + ")" ).addClass("label-danger");
            $("#row" + index).children( ":nth-child(" + middleRight + ")" ).addClass("label-danger");
          }
        }

        // init
        $("#results").empty();
        for (var i = 0; i < matrix.length; i++) {
          renderRow(matrix[i], i);
        }
      }

      // prep an matrix with the correct number of elements
      // set all elements to 1
      this.prepMatrix = function(matrix, totalLines) {
        for (var line = 0; line < totalLines; line++) {
          matrix[line] = [];
          for (var element = 0; element <= line; element++) {
            matrix[line][element] = 1;
          }
        }
        return matrix;
      };

      // go through rows and apply pascal function
      // top to bottom, look at parents to find value
      this.calcValues = function(matrix) {
        // for every row
        for (var line = 0; line < totalLines; line++) {
          // if it's not the first two rows, where elements remain 1
          if (matrix[line].length > 2) {
            // for every element
            for (var element = 0; element <= line; element++) {
              // if it's not the left-most or right-most element, which remain 1
              if (element > 0 && element < line) {
                // find left and right parents, sum for value
                var leftParent = matrix[line-1][element-1];
                var rightParent = matrix[line-1][element];
                var value = leftParent + rightParent;
                matrix[line][element] = value;

              }
            }
          }
        }
        return matrix;        
      };

      // init
      this.matrix = [];
      this.matrix = this.prepMatrix(this.matrix, totalLines);
      this.matrix = this.calcValues(this.matrix);
      this.render(this.matrix);
    }

    return Triangle;
  })();

  return new Triangle();
}

// jquery form handler
$("#form").submit(function( event ) {
  event.preventDefault();
  // check input validity
  var input = $('#form :input')[0].value;
  if (!isNaN(input)) {
    // generate the triangle
    var triangle = generateTriangle(input);
  } else {
    //error
    console.log('error!');
  }
});


