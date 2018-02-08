<?php require("../templates/header.php"); ?>

<script type="text/javascript">
// set default grade, button will be checked
grade = 'naplan_year3';
</script>

<form class="form-inline" name="naplan_details" method="get">
    <fieldset>
        <h3>Primary school NAPLAN data</h3>
        <h4>Choose a grade (3 or 5) and a year (2008-2014)</h4><br>
            <div id="radio" class="form-group" style="font-size: 16px; padding:7px; color: #666666;
                background-color: #FFFFCC; border-radius: 5px; border: 1px solid #666666;
                vertical-align: middle" >
                <label><input type="radio" name="grade" value="naplan_year3" 
                        checked onClick="window.grade=this.value">Year 3</label>
                <label><input type="radio" name="grade" value="naplan_year5"
                        onClick="window.grade=this.value">Year 5</label>
            </div>
            <div class="form-group" style="font-size: 16px; padding: 10px; color: #666666;
                 background-color: #CCFFCC; border-radius: 5px; border: 1px solid #666666;" > <!-- "form-group" -->
                <select name="year" id="year_list">
                    <option id="opt1" value="2014">2014</option>
                    <option id="opt2" value="2013">2013</option>
                    <option id="opt3" value="2012">2012</option>
                    <option id="opt4" value="2011">2011</option>
                    <option id="opt5" value="2010">2010</option>
                    <option id="opt6" value="2009">2009</option>
                    <option id="opt7" value="2008">2008</option>
                </select>
            </div>
            <div class="form-group">
                <button id= "submitbutton" class="btn btn-info btn-lg" style="color:light-green"
                <span class="glyphicon glyphicon-ok" ></span> Generate Table
            </div>
    </fieldset>
</form><br>

<div>
   <h4 class=darkblue>Table is sortable - click a heading to sort</h4><br>
</div>
            
<div class="naplan">
    <table id="test" class="sortable">
        <thead>
            <tr><th>School Name</th><th>Year</th><th>ICSEA</th><th>Reading</th><th>Writing</th><th>Spelling</th><th>Grammar</th><th>Numeracy</th><th>Total</th></tr>
        </thead>
        <tbody>
            <!-- javascript generated content goes here -->             
        </tbody>
            <!-- javascript generated content goes here too, for the footer -->  
    </table>
    
</div><br>

<div>
    <p>
    <h4>About NAPLAN</h4>
    The National Assessment Program - literacy and numeracy (NAPLAN) assesses
    students using common national tests in reading, writing, language conventions
    (spelling, grammar and punctuation) and numeracy. NAPLAN tests broadly reflect
    aspects of literacy and numeracy common to curricula in all states and territories.
    </p>
    <p>
    All students in Years 3, 5, 7 and 9 in government and non-government schools
    across Australia participate in NAPLAN tests. Some students are eligible for
    exemption, such as students from a non-English speaking background who have
    been in Australia for less than one year, and students with severe intellectual or
    functional disabilities.<br>
    See <a href="http://www.acara.edu.au/verve/_resources/About_NAPLAN_2014_file.pdf">here</a>
     for more information.<br>
    </p><br>
    <p>
    <h4>About ICSEA</h4>
    ICSEA is a scale which allows for fair and reasonable comparisons among schools with similar students.
    ICSEA stands for the Index of Community socio-educational advantage.
    </p>
    <p>
    ICSEA provides an indication of the socio-educational backgrounds of
    students; it has nothing to do with the staff, school facilities
    or teaching programs at the school. 
    See <a href="http://www.acara.edu.au/verve/_resources/About_ICSEA_2014.pdf">here</a>
    for more information.<br>
    </p>

<?php require("../templates/footer.php"); ?>

