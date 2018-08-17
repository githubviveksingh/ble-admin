$(document).ready(function(){

    $(".selectbox").select2();
    $(".nav-item").each(function(){
        var href = $(this).find("a.nav-link").attr("href");
        console.log(href);
    })
    
/*  Use to hide and show div according rule type */
    $('.ruleType').click(function(){ 
        /* find rule type check data */
        $("input:checkbox[class=ruleType]:checked").each(function () {
            var check   =  $(this).val();
            if(check == 1){
                $("#statementDiv").removeClass("hide");
            }else if(check == 2){
                $("#readerDiv").removeClass("hide");
            }else if(check == 3){
                $("#tagDiv").removeClass("hide");
            }else if(check == 4){
                $("#timeDiv").removeClass("hide");
            }
        });
        /* find rule type uncheck data */
        $("input:checkbox[class=ruleType]:unchecked").each(function () {
            var uncheck     =  $(this).val();
            if(uncheck == 1){
                $("#statementDiv").addClass("hide");
            }else if(uncheck == 2){
                $("#readerDiv").addClass("hide");
            }else if(uncheck == 3){
                $("#tagDiv").addClass("hide");
            }else if(uncheck == 4){
                $("#timeDiv").addClass("hide");
            }
        });
    });

/*  Use to hide and show div according rule alert type */
    $(".ruleAlertType").click(function(){
        /* find rule alert type check data */
        $("input:checkbox[class=ruleAlertType]:checked").each(function () {
            var check =  $(this).val();
            if(check == 'email'){
                $("#emailFileds").removeClass("hide");
            }else if(check == 'sms'){
                $("#phoneField").removeClass("hide");
            }else if(check == 'other'){
                $("#otherField").removeClass("hide");
            }
        });
        /* find rule alert type uncheck data */
        $("input:checkbox[class=ruleAlertType]:unchecked").each(function () {
            var uncheck =  $(this).val();
            if(uncheck == 'email'){
                $("#emailFileds").addClass("hide");
            }else if(uncheck == 'sms'){
                $("#phoneField").addClass("hide");
            }else if(uncheck == 'other'){
                $("#otherField").addClass("hide");
            }
        });

        var ruleAlertType = $('.ruleAlertType:checked').map(function() {return this.value;}).get().join('-');
         if(ruleAlertType == ''){
            $(".hrTagClose").addClass("hide");
        }else{
            $(".hrTagClose").removeClass("hide");
        }
    });

/* Use to set data to Rule alert type for edit page    */
    /* find rule alert type check data */
    $("input:checkbox[class=ruleAlertType]:checked").each(function () {
        var editCheck =  $(this).val();
        if(editCheck == 'email'){
            $("#emailFileds").removeClass("hide");
        }else if(editCheck == 'sms'){
            $("#phoneField").removeClass("hide");
        }else if(editCheck == 'other'){
            $("#otherField").removeClass("hide");
        }
    });
    /* find rule alert type uncheck data */
    $("input:checkbox[class=ruleAlertType]:unchecked").each(function () {
        var editUncheck =  $(this).val();
        if(editUncheck == 'email'){
            $("#emailFileds").addClass("hide");
        }else if(editUncheck == 'sms'){
            $("#phoneField").addClass("hide");
        }else if(editUncheck == 'other'){
            $("#otherField").addClass("hide");
        }
    });

    /* Use to set data to Rule type for edit page    */
    /* find rule type check data */
    $("input:checkbox[class=ruleType]:checked").each(function () {
        var editCheck   =  $(this).val();
        if(editCheck == 1){
            $("#statementDiv").removeClass("hide");
        }else if(editCheck == 2){
            $("#readerDiv").removeClass("hide");
        }else if(editCheck == 3){
            $("#tagDiv").removeClass("hide");
        }else if(editCheck == 4){
            $("#timeDiv").removeClass("hide");
        }
    });
    /* find rule alert type uncheck data */
    $("input:checkbox[class=ruleType]:unchecked").each(function () {
        var editUncheck     =  $(this).val();
        if(editUncheck == 1){
            $("#statementDiv").addClass("hide");
        }else if(editUncheck == 2){
            $("#readerDiv").addClass("hide");
        }else if(editUncheck == 3){
            $("#tagDiv").addClass("hide");
        }else if(editUncheck == 4){
            $("#timeDiv").addClass("hide");
        }
    });

    /* Get all tag serial number account wise */
    $(".getAccounts").change(function(){
        var accountID = $("select#selectAccount option:selected").val();
        if(accountID == 0){
            $(".accountRelation").addClass("hide");
        }else{
            $(".accountRelation").removeClass("hide");
            var urls = "ajax/account-tags.php?accountId="+accountID;
            var data = '';
            $.ajax({
                type: "GET",
                cache:false,
                data: data,
                url: urls,
                success: function(html){
                    /* append success data */
                    $('#tagSerailNumber').html(html); 
                }  
            });
        }
    })

    /* Get all reader serial number Zone wise */
    $(".zonebox").change(function(){
        var zoneId = $("select#selectZone option:selected").val();
        if(zoneId == 0){
            $(".zoneRelation").addClass("hide");
        }else{
            $(".zoneRelation").removeClass("hide");
            var urls = "ajax/zone-reader.php?zoneId="+zoneId;
            var data = '';
            $.ajax({
                type: "GET",
                cache:false,
                data: data,
                url: urls,
                success: function(html){
                    /* append success data */
                    $('#readerSerailNumber').html(html); 
                }  
            });
        }
    });
});