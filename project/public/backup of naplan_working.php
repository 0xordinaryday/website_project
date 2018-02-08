<?php require("../templates/header.php"); ?>

<script type="text/javascript">
// set default grade, button will be checked
grade = 'naplan_year3';
</script>

<form class="form-inline" name="naplan_details" method="get">
    <fieldset>
        <h3>Heading goes here</h3>
            <div id="radio" class="form-group">
                <label><input type="radio" name="grade" value="naplan_year3" 
                        checked onClick="window.grade=this.value">Year 3</label>
                <label><input type="radio" name="grade" value="naplan_year5"
                        onClick="window.grade=this.value">Year 5</label>
            </div>
            <div class="form-group">
                <select name="year" id="year_list">
                    <option id="opt1" value="2008">2008</option>
                    <option id="opt2" value="2009">2009</option>
                    <option id="opt3" value="2010">2010</option>
                    <option id="opt4" value="2011">2011</option>
                    <option id="opt5" value="2012">2012</option>
                    <option id="opt6" value="2013">2013</option>
                    <option id="opt7" value="2014">2014</option>
                </select>
            </div>
            <div class="form-group">
                <button id= "submitbutton" class="btn btn-info btn-lg" style="color:light-green"
                <span class="glyphicon glyphicon-ok" ></span> Generate Table
            </div>
    </fieldset>
</form>

<div>
   <h4 class=lightblue>Year 3 Naplan Data for 2014</h4>
</div>
            
<div class="naplan">
    <table id="test" class="sortable">
        <thead>
            <tr><th>FUCK YEAH</th><th>Year</th><th>Reading</th><th>Writing</th><th>Spelling</th><th>Grammar</th><th>Numeracy</th><th>Total</th><th>ICSEA</th></tr>
        </thead>
        <tbody>
            <!-- javascript generated content goes here -->             
        </tbody>
        <tfoot>
            <tr><td>NATIONAL AVERAGES</td><td>1000</td><td></td><td></td><td>501</td><td>468</td><td>498</td><td>504</td><td>488</td><td>2459</td><td>491.8</td><td>0.4067</td></tr>
        </tfoot>
    </table>
    
</div>

<?php require("../templates/footer.php"); ?>

