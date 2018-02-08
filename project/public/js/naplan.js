/**
 * naplan.js
 *
 * Computer Science 50
 * Final project
 *
 * JavaScript for naplan tables
 */

// variables for Naplan
var grade;
var year;

/**
 * Get naplan data and make table
 */

$(function(){ // on ready

$('#submitbutton').on('click', function (e) {

    window.year = $('#year_list option:selected').val();
    // alert("Hello, grade is " + grade + " and year is " + year);

    var parameters = {
    grade: grade,
    year: year
    };
    
    // get school data
    
    $.getJSON("naplan.php", parameters)
    .done(function(data, textStatus, jqXHR) 
    {
                
    // console.log(data);
    
    // empty existing table rows
    $("#test > tbody").html("");
    $("#test > tfoot").html("");
    var total = 0;
    var natotal = 0;

    for (var i = 0; i < data.length; i++) 
    {
        tr = $('<tr>');
        total = parseInt(data[i].reading) + parseInt(data[i].writing) + 
                    parseInt(data[i].spelling) + parseInt(data[i].grammar) + 
                    parseInt(data[i].numeracy);
                    tr.append("<td>" + data[i].school_name + "</td>");
                    tr.append("<td>" + data[i].year + "</td>");
                    if (data[i].icsea.length < 4)
                    {                   
                        tr.append("<td>" + '0' + data[i].icsea + "</td>");
                    }
                    else
                    {                   
                        tr.append("<td>" + data[i].icsea + "</td>");
                    }
                    tr.append("<td>" + data[i].reading + "</td>");
                    tr.append("<td>" + data[i].writing + "</td>");
                    tr.append("<td>" + data[i].spelling + "</td>");
                    tr.append("<td>" + data[i].grammar + "</td>");
                    tr.append("<td>" + data[i].numeracy + "</td>");
                    tr.append("<td>" + total + "</td>");
                    tr.append("</tr>");
                    $('#test').append(tr);
     }
     })
                
     .fail(function(jqXHR, textStatus, errorThrown) 
     {
         // log error to browser's console
         console.log(errorThrown.toString());
     });
     
     // get national average data
     
     $.getJSON("naplan_averages.php", parameters)
    .done(function(data, textStatus, jqXHR) 
    {
                
    // console.log(data);
    
    for (var i = 0; i < data.length; i++) 
    {
        tf = $("<tfoot><tr>");
        natotal = parseInt(data[i].reading) + parseInt(data[i].writing) + 
                    parseInt(data[i].spelling) + parseInt(data[i].grammar) + 
                    parseInt(data[i].numeracy);
                    tf.append("<td>" + data[i].school_name + "</td>");
                    tf.append("<td>" + data[i].year + "</td>");
                    tf.append("<td>" + '1000' + "</td>");
                    tf.append("<td>" + data[i].reading + "</td>");
                    tf.append("<td>" + data[i].writing + "</td>");
                    tf.append("<td>" + data[i].spelling + "</td>");
                    tf.append("<td>" + data[i].grammar + "</td>");
                    tf.append("<td>" + data[i].numeracy + "</td>");
                    tf.append("<td>" + natotal + "</td>");
                    tf.append("</tr></tfoot>");
                    $('#test').append(tf);
     }
     })
                
     .fail(function(jqXHR, textStatus, errorThrown) 
     {
         // log error to browser's console
         console.log(errorThrown.toString());
     });
     
return false;

});
    

});    
