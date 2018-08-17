function ACCOUNT_ADD(d){
    $("#modalTitle").html("Account Added");
    var jsonDecode = $.parseJSON(d.data);
    var flag    = '';
    var notificationFlag=jsonDecode.accountNotificationFlag;
    if(notificationFlag==0){
        flag    = "No";
    }else{
        flag    = "Yes";
    }
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Account Name</td><td>"+jsonDecode.accountName+"</td></tr> \
                    <tr><td>Email</td><td>"+jsonDecode.accountEmail+"</td></tr> \
                    <tr><td>Phone</td><td>"+jsonDecode.accountPhone+"</td></tr> \
                    <tr><td>Contact Person</td><td>"+jsonDecode.accountContact+"</td></tr> \
                    <tr><td>Address</td><td>"+jsonDecode.accountAddress+"</td></tr> \
                    <tr><td>Description</td><td>"+jsonDecode.accountDescription+"</td></tr> \
                    <tr><td>Notification Flag</td><td>"+flag+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function ACCOUNT_UPD(d){
    $("#modalTitle").html("Account Updated");
    var jsonDecode = $.parseJSON(d.data);

    var nameClass       = "";
    var emailClass      = "";
    var phoneClass      = "";
    var contactClass    = "";
    var addressClass    = "";
    var descClass       = "";
    var flagClass       = "";
    if(jsonDecode.old_values.accountName != jsonDecode.new_values.accountName){
        nameClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountEmail != jsonDecode.new_values.accountEmail){
        emailClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountPhone != jsonDecode.new_values.accountPhone){
        phoneClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountContact != jsonDecode.new_values.accountContact){
        contactClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountAddress != jsonDecode.new_values.accountAddress){
        addressClass = "alert alert-danger";accountAddress
    }
    if(jsonDecode.old_values.accountDescription != jsonDecode.new_values.accountDescription){
        descClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountNotificationFlag != jsonDecode.new_values.accountNotificationFlag){
        flagClass = "alert alert-danger";
    }
    var oldflag    = '';
    var newflag    = '';
    var oldnotificationFlag=jsonDecode.old_values.accountNotificationFlag;
    var newnotificationFlag=jsonDecode.new_values.accountNotificationFlag;
    if(oldnotificationFlag==0){
        oldflag    = "No";
    }else{
        oldflag    = "Yes";
    }
    if(newnotificationFlag==0){
        newflag    = "No";
    }else{
        newflag    = "Yes";
    }

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+nameClass+'"><td>Account Name</td><td>'+jsonDecode.old_values.accountName+'</td><td>'+jsonDecode.new_values.accountName+'</td></tr> \
                    <tr class="'+emailClass+'"><td>Email</td><td>'+jsonDecode.old_values.accountEmail+'</td><td>'+jsonDecode.new_values.accountEmail+'</td></tr> \
                    <tr class="'+phoneClass+'"><td>Phone</td><td>'+jsonDecode.old_values.accountPhone+'</td><td>'+jsonDecode.new_values.accountPhone+'</td></tr> \
                    <tr class="'+contactClass+'"><td>Contact Person</td><td>'+jsonDecode.old_values.accountContact+'</td><td>'+jsonDecode.new_values.accountContact+'</td></tr> \
                    <tr class="'+addressClass+'"><td>Address</td><td>'+jsonDecode.old_values.accountAddress+'</td><td>'+jsonDecode.new_values.accountAddress+'</td></tr> \
                    <tr class="'+descClass+'"><td>Description</td><td>'+jsonDecode.old_values.accountDescription+'</td><td>'+jsonDecode.new_values.accountDescription+'</td></tr> \
                    <tr class="'+flagClass+'"><td>Notification Flag</td><td>'+oldflag+'</td><td>'+newflag+'</td></tr> \
                </tbody>';

    $("#modalTable").html(html);
}


function USER_ADD(d){
    $("#modalTitle").html("User Added");
    var jsonDecode  = $.parseJSON(d.data);
    var emailflag   = '';
    var phoneflag   = '';
    var loginflag   = '';
    var adminFlag   = jsonDecode.defaultAdmin;
    var emailFlag   = jsonDecode.userNotifyEmail;
    if(emailFlag==0){
        emailflag   = "No";
    }else{
        emailflag   = "Yes";
    }
    var phoneFlag   = jsonDecode.userNotifyPhone;
    if(phoneFlag==0){
        phoneflag   = "No";
    }else{
        phoneflag   = "Yes";
    }
    var loginFlag   = jsonDecode.userType;
    if(loginFlag==0){
        loginflag   = "No";
    }else{
        loginflag   = "Yes";
    }
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>User Name</td><td>"+jsonDecode.userName+"</td></tr> \
                    <tr><td>Email</td><td>"+jsonDecode.userEmail+"</td></tr> \
                    <tr><td>Phone</td><td>"+jsonDecode.userPhone+"</td></tr> \
                    <tr><td>User Description</td><td>"+jsonDecode.userDescription+"</td></tr> \
                    <tr><td>Role ID</td><td>"+jsonDecode.roleID+"</td></tr> \
                    <tr><td>Allow Login</td><td>"+loginflag+"</td></tr> \
                    <tr><td>Notify On Mail</td><td>"+emailflag+"</td></tr> \
                    <tr><td>Notify On Phone</td><td>"+phoneflag+"</td></tr> \
                    <tr><td>Created</td><td>"+jsonDecode.userCreateTime+"</td></tr> \
                    <tr><td>Modified</td><td>"+jsonDecode.userUpdateTime+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function USER_UPD(d){
    $("#modalTitle").html("User Updated");
    var jsonDecode = $.parseJSON(d.data);

    var usernameClass   = "";
    var emailClass      = "";
    var phoneClass      = "";
    var roleClass       = "";
    var loginClass      = "";
    var descClass       = "";
    var emailflagClass  = "";
    var phoneflagClass  = "";
    var createdClass    = "";
    var updatedClass    = "";
    if(jsonDecode.old_values.userName != jsonDecode.new_values.userName){
        usernameClass   = "alert alert-danger";
    }
    if(jsonDecode.old_values.userEmail != jsonDecode.new_values.userEmail){
        emailClass      = "alert alert-danger";
    }
    if(jsonDecode.old_values.userPhone != jsonDecode.new_values.userPhone){
        phoneClass      = "alert alert-danger";
    }
    if(jsonDecode.old_values.roleID != jsonDecode.new_values.roleID){
        roleClass       = "alert alert-danger";
    }
    if(jsonDecode.old_values.userType != jsonDecode.new_values.userType){
        loginClass      = "alert alert-danger";
    }
    if(jsonDecode.old_values.userDescription != jsonDecode.new_values.userDescription){
        descClass       = "alert alert-danger";
    }
    if(jsonDecode.old_values.userNotifyEmail != jsonDecode.new_values.userNotifyEmail){
        emailflagClass  = "alert alert-danger";
    }
    if(jsonDecode.old_values.userNotifyPhone != jsonDecode.new_values.userNotifyPhone){
        phoneflagClass  = "alert alert-danger";
    }
    if(jsonDecode.old_values.userCreateTime != jsonDecode.new_values.userCreateTime){
        createdClass    = "alert alert-danger";
    }
    if(jsonDecode.old_values.userUpdateTime != jsonDecode.new_values.userUpdateTime){
        updatedClass    = "alert alert-danger";
    }
    var emailflag       = '';
    var phoneflag       = '';
    var emailoldflag    = '';
    var phoneoldflag    = '';
    var loginflag       = '';
    var loginoldflag    = '';

    
    var emailFlag       = jsonDecode.new_values.userNotifyEmail;
    if(emailFlag==0){
        emailflag       = "No";
    }else{
        emailflag       = "Yes";
    }
    var phoneFlag       = jsonDecode.new_values.userNotifyPhone;
    if(phoneFlag==0){
        phoneflag       = "No";
    }else{
        phoneflag       = "Yes";
    }
    var emailOldFlag    = jsonDecode.old_values.userNotifyEmail;
    if(emailOldFlag==0){
        emailoldflag    = "No";
    }else{
        emailoldflag    = "Yes";
    }
    var phoneOldFlag    = jsonDecode.old_values.userNotifyPhone;
    if(phoneOldFlag==0){
        phoneoldflag    = "No";
    }else{
        phoneoldflag    = "Yes";
    }
    var loginFlag       = jsonDecode.old_values.userType;
    if(loginFlag==0){
        loginflag       = "No";
    }else{
        loginflag       = "Yes";
    }
    var loginOldFlag    = jsonDecode.old_values.defaultAdmin;
    if(loginOldFlag==0){
        loginoldflag    = "No";
    }else{
        loginoldflag    = "Yes";
    }
    
    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+usernameClass+'"><td>User Name</td><td>'+jsonDecode.old_values.userName+'</td><td>'+jsonDecode.new_values.userName+'</td></tr> \
                    <tr class="'+emailClass+'"><td>Email</td><td>'+jsonDecode.old_values.userEmail+'</td><td>'+jsonDecode.new_values.userEmail+'</td></tr> \
                    <tr class="'+phoneClass+'"><td>Phone</td><td>'+jsonDecode.old_values.userPhone+'</td><td>'+jsonDecode.new_values.userPhone+'</td></tr> \
                    <tr class="'+roleClass+'"><td>Role ID</td><td>'+jsonDecode.old_values.userType+'</td><td>'+jsonDecode.new_values.userType+'</td></tr> \
                    <tr class="'+descClass+'"><td>Description</td><td>'+jsonDecode.old_values.userDescription+'</td><td>'+jsonDecode.new_values.userDescription+'</td></tr> \
                    <tr class="'+loginClass+'"><td>Login Access</td><td>'+loginoldflag+'</td><td>'+loginflag+'</td></tr> \
                    <tr class="'+emailflagClass+'"><td>Notify Email</td><td>'+emailoldflag+'</td><td>'+emailflag+'</td></tr> \
                    <tr class="'+phoneflagClass+'"><td>Notify Phonr</td><td>'+phoneoldflag+'</td><td>'+phoneflag+'</td></tr> \
                    <tr class="'+updatedClass+'"><td>Updated</td><td>'+jsonDecode.old_values.userUpdateTime+'</td><td>'+jsonDecode.new_values.userUpdateTime+'</td></tr> \
                </tbody>';

    $("#modalTable").html(html);
}

function ROLE_ADD(d){
    $("#modalTitle").html("Role Added");
    var jsonDecode      = $.parseJSON(d.data);
    var permission      = '';
    var permissionFlag  = jsonDecode.rolePermissionFlag;
    if(permissionFlag==0){
        permission   = "No";
    }else{
        permission   = "Yes";
    }
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Role Name</td><td>"+jsonDecode.roleName+"</td></tr> \
                    <tr><td>Description</td><td>"+jsonDecode.roleDescription+"</td></tr> \
                    <tr><td>Permission</td><td>"+permission+"</td></tr> \
                    <tr><td>Created</td><td>"+jsonDecode.roleCreateDate+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}

function ROLE_UPD(d){
    $("#modalTitle").html("Role Updated");
    var jsonDecode = $.parseJSON(d.data);

    var nameClass       = "";
    var emailClass      = "";
    var phoneClass      = "";
    var contactClass    = "";
    if(jsonDecode.old_values.roleName != jsonDecode.new_values.roleName){
        nameClass       = "alert alert-danger";
    }
    if(jsonDecode.old_values.roleDescription != jsonDecode.new_values.roleDescription){
        emailClass      = "alert alert-danger";
    }
    if(jsonDecode.old_values.rolePermissionFlag != jsonDecode.new_values.rolePermissionFlag){
        phoneClass      = "alert alert-danger";
    }
    if(jsonDecode.old_values.roleUpdateDate != jsonDecode.new_values.roleUpdateDate){
        contactClass    = "alert alert-danger";
    }
    var permissionflag      = '';
    var oldpermissionflag   = '';
    
    var permissionFlag=jsonDecode.new_values.accountNotificationFlag;
    if(permissionFlag==0){
        permissionflag    = "No";
    }else{
        permissionflag    = "Yes";
    }
    
    var oldpermissionFlag=jsonDecode.new_values.accountNotificationFlag;
    if(oldpermissionFlag==0){
        oldpermissionflag    = "No";
    }else{
        oldpermissionflag    = "Yes";
    }
    

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+nameClass+'"><td>Role Name</td><td>'+jsonDecode.old_values.roleName+'</td><td>'+jsonDecode.new_values.roleName+'</td></tr> \
                    <tr class="'+emailClass+'"><td>Description</td><td>'+jsonDecode.old_values.roleDescription+'</td><td>'+jsonDecode.new_values.roleDescription+'</td></tr> \
                    <tr class="'+phoneClass+'"><td>Permission</td><td>'+oldpermissionflag+'</td><td>'+permissionflag+'</td></tr> \
                    <tr class="'+contactClass+'"><td>Updated</td><td>'+jsonDecode.old_values.roleUpdateDate+'</td><td>'+jsonDecode.new_values.roleUpdateDate+'</td></tr> \
                </tbody>';

    $("#modalTable").html(html);
}

function PERMISSION_ADD(d){
    $("#modalTitle").html("Permission Added");
    var jsonDecode      = $.parseJSON(d.data);
    var actions         = "";
    var actionLength    =jsonDecode.actionPages.length;
    if(actionLength>20){
        actions         = jsonDecode.actionPages.substring(0, 20)+'...';
    }else{
        actions         = jsonDecode.actionPages.substring(0, 20);
    }
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Role ID</td><td>"+jsonDecode.roleID+"</td></tr> \
                    <tr><td>Permissions</td><td>"+actions+"</td></tr> \
                    <tr><td>Created</td><td>"+jsonDecode.createdOn+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}

function PERMISSION_UPD(d){
    $("#modalTitle").html("Permission Updated");
    var jsonDecode = $.parseJSON(d.data);

    var actions             = "";
    var oldactions          = "";
    var roleClass           = "";
    var permissionClass     = "";
    var createdClass        = "";
    if(jsonDecode.old_values.roleID != jsonDecode.new_values.roleID){
        roleClass           = "alert alert-danger";
    }
    if(jsonDecode.old_values.actionPages != jsonDecode.new_values.actionPages){
        permissionClass     = "alert alert-danger";
    }
    if(jsonDecode.old_values.updatedOn != jsonDecode.new_values.updatedOn){
        createdClass        = "alert alert-danger";
    }
    var actionLength    = jsonDecode.new_values.actionPages.length;
    if(actionLength>20){
        actions         = jsonDecode.old_values.actionPages.substring(0, 20)+'...';
    }else{
        actions         = jsonDecode.old_values.actionPages.substring(0, 20);
    }

    var actionoldLength = jsonDecode.old_values.actionPages.length;
    if(actionoldLength>20){
        oldactions      = jsonDecode.old_values.actionPages.substring(0, 20)+'...';
    }else{
        oldactions      = jsonDecode.old_values.actionPages.substring(0, 20);
    }
    
    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+roleClass+'"><td>Role ID</td><td>'+jsonDecode.old_values.roleID+'</td><td>'+jsonDecode.new_values.roleID+'</td></tr> \
                    <tr class="'+permissionClass+'"><td>Permissions</td><td>'+oldactions+'</td><td>'+actions+'</td></tr> \
                    <tr class="'+createdClass+'"><td>Updated</td><td>'+jsonDecode.old_values.updatedOn+'</td><td>'+jsonDecode.old_values.updatedOn+'</td></tr> \
                    </tbody>';

    $("#modalTable").html(html);
}

function TAG_ADD(d){ 
    $("#modalTitle").html("Tag Added");
    var jsonDecode = $.parseJSON(d.data);
   
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Tag Name</td><td>"+jsonDecode.tagSerial+"</td></tr> \
                    <tr><td>Tag Mac</td><td>"+jsonDecode.tagMAC+"</td></tr> \
                    <tr><td>Account ID</td><td>"+jsonDecode.accountID+"</td></tr> \
                    <tr><td>Tag User ID</td><td>"+jsonDecode.tagUserID+"</td></tr> \
                    <tr><td>Tag Last Tx</td><td>"+jsonDecode.tagLastTx+"</td></tr> \
                    <tr><td>Tag Last RSSI</td><td>"+jsonDecode.tagLastRSSI+"</td></tr> \
                    <tr><td>Tag Last Sensor</td><td>"+jsonDecode.tagLastSensor+"</td></tr> \
                    <tr><td>Tag Last Battery</td><td>"+jsonDecode.tagLastBattery+"</td></tr> \
                    <tr><td>Tag Last Status</td><td>"+jsonDecode.tagLastStatus+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function TAG_UPD(d){
    $("#modalTitle").html("Tag Updated");
    var jsonDecode = $.parseJSON(d.data);
    var serialClass         = "";
    var macClass            = "";
    var accountClass        = "";
    var tagUserClass        = "";
    var tagLastTxClass      = "";
    var tagLastRssiClass    = "";
    var tagLastSensorClass  = "";
    var tagLastBatteryClass = "";
    var tagLastStatusClass  = "";
    if(jsonDecode.old_values.tagSerial != jsonDecode.new_values.tagSerial){
        serialClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagMAC != jsonDecode.new_values.tagMAC){
        macClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountID != jsonDecode.new_values.accountID){
        accountClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagUserID != jsonDecode.new_values.tagUserID){
        tagUserClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagLastTx != jsonDecode.new_values.tagLastTx){
        tagLastTxClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagLastRSSI != jsonDecode.new_values.tagLastRSSI){
        tagLastRssiClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagLastSensor != jsonDecode.new_values.tagLastSensor){
        tagLastSensorClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagLastBattery != jsonDecode.new_values.tagLastBattery){
        tagLastBatteryClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagLastStatusClass != jsonDecode.new_values.tagLastStatusClass){
        tagLastStatusClass = "alert alert-danger";
    }

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+serialClass+'"><td>Serial Class</td><td>'+jsonDecode.old_values.tagSerial+'</td><td>'+jsonDecode.new_values.tagSerial+'</td></tr> \
                    <tr class="'+macClass+'"><td>Mac Class</td><td>'+jsonDecode.old_values.tagMAC+'</td><td>'+jsonDecode.new_values.tagMAC+'</td></tr> \
                    <tr class="'+accountClass+'"><td>Account Class</td><td>'+jsonDecode.old_values.accountID+'</td><td>'+jsonDecode.new_values.accountID+'</td></tr> \
                    <tr class="'+tagUserClass+'"><td>Tag User Class</td><td>'+jsonDecode.old_values.tagUserID+'</td><td>'+jsonDecode.new_values.tagUserID+'</td></tr> \
                    <tr class="'+tagLastTxClass+'"><td>Tag Last Tx Class</td><td>'+jsonDecode.old_values.tagLastTx+'</td><td>'+jsonDecode.new_values.tagLastTx+'</td></tr> \
                    <tr class="'+tagLastRssiClass+'"><td>Tag Last Rssi Class</td><td>'+jsonDecode.old_values.tagLastRSSI+'</td><td>'+jsonDecode.new_values.tagLastRSSI+'</td></tr> \
                    <tr class="'+tagLastSensorClass+'"><td>Tag Last Sensor Class</td><td>'+jsonDecode.old_values.tagLastSensor+'</td><td>'+jsonDecode.new_values.tagLastSensor+'</td></tr> \
                    <tr class="'+tagLastBatteryClass+'"><td>Tag Last Battery Class</td><td>'+jsonDecode.old_values.tagLastStatus+'</td><td>'+jsonDecode.new_values.tagLastStatus+'</td></tr> \
                    <tr class="'+tagLastStatusClass+'"><td>Tag Last Status Class</td><td>'+jsonDecode.old_values.tagLastBattery+'</td><td>'+jsonDecode.new_values.tagLastBattery+'</td></tr> \
                </tbody>';

    $("#modalTable").html(html);
}
function ZONE_ADD(d){ 
    $("#modalTitle").html("Zone Added");
    var jsonDecode = $.parseJSON(d.data); 
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Zone Type</td><td>"+jsonDecode.zoneTypeName+"</td></tr> \
                    <tr><td>Zone Description</td><td>"+jsonDecode.zoneDescription+"</td></tr> \
                    <tr><td>Account ID</td><td>"+jsonDecode.zoneAccountName+"</td></tr> \
                    <tr><td>Creation Time</td><td>"+jsonDecode.zoneCreationTime+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function ZONE_UPD(d){
    $("#modalTitle").html("Zone Updated");
    var jsonDecode = $.parseJSON(d.data);
    var typeClass         = "";
    var descClass            = "";
    var accountClass        = "";
    var creationTimeClass        = "";
    if(jsonDecode.old_values.zoneTypeName != jsonDecode.new_values.zoneTypeName){
        typeClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.zoneDescription != jsonDecode.new_values.zoneDescription){
        descClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.zoneAccountName != jsonDecode.new_values.zoneAccountName){
        accountClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.zoneCreationTime != jsonDecode.new_values.zoneCreationTime){
        creationTimeClass = "alert alert-danger";
    }

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+typeClass+'"><td>Zone Type</td><td>'+jsonDecode.old_values.zoneTypeName+'</td><td>'+jsonDecode.new_values.zoneTypeName+'</td></tr> \
                    <tr class="'+descClass+'"><td>Zone Description</td><td>'+jsonDecode.old_values.zoneDescription+'</td><td>'+jsonDecode.new_values.zoneDescription+'</td></tr> \
                    <tr class="'+accountClass+'"><td>Account</td><td>'+jsonDecode.old_values.zoneAccountName+'</td><td>'+jsonDecode.new_values.zoneAccountName+'</td></tr> \
                    <tr class="'+creationTimeClass+'"><td>Creation Time</td><td>'+jsonDecode.old_values.zoneCreationTime+'</td><td>'+jsonDecode.new_values.zoneCreationTime+'</td></tr> \                </tbody>';

    $("#modalTable").html(html);
}
function READER_ADD(d){ 
    $("#modalTitle").html("Reader Added");
    var jsonDecode = $.parseJSON(d.data);
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Reader Serial</td><td>"+jsonDecode.readerSerial+"</td></tr> \
                    <tr><td>Reader WMAC</td><td>"+jsonDecode.readerWMac+"</td></tr> \
                    <tr><td>Reader BMAC</td><td>"+jsonDecode.readerBMac+"</td></tr> \
                    <tr><td>Reader GMAC</td><td>"+jsonDecode.readerGMac+"</td></tr> \
                    <tr><td>Account ID</td><td>"+jsonDecode.accountID+"</td></tr> \
                    <tr><td>Reader Power</td><td>"+jsonDecode.readerPower+"</td></tr> \
                    <tr><td>Reader Type</td><td>"+jsonDecode.readerType+"</td></tr> \
                    <tr><td>Reader Last Status</td><td>"+jsonDecode.readerLastStatus+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function READER_UPD(d){
    $("#modalTitle").html("Reader Updated");
    var jsonDecode = $.parseJSON(d.data);
    var readerSerialClass      = "";
    var readerWmacClass        = "";
    var readerBmacClass        = "";
    var readerGmacClass        = "";
    var readeraccountID        = "";
    var readerPower        = "";
    var readerType        = "";
    var readerLastStatus        = "";
    if(jsonDecode.old_values.readerSerial != jsonDecode.new_values.readerSerial){
        readerSerialClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerWMac != jsonDecode.new_values.readerWMac){
        readerWmacClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerBMac != jsonDecode.new_values.readerBMac){
        readerBmacClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerGMac != jsonDecode.new_values.readerGMac){
        readerGmacClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountID != jsonDecode.new_values.accountID){
        readeraccountID = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerPower != jsonDecode.new_values.readerPower){
        readerPower = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerType != jsonDecode.new_values.readerType){
        readerType = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerLastStatus != jsonDecode.new_values.readerLastStatus){
        readerLastStatus = "alert alert-danger";
    }

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+readerSerialClass+'"><td>Reader Serial</td><td>'+jsonDecode.old_values.readerSerial+'</td><td>'+jsonDecode.new_values.readerSerial+'</td></tr> \
                    <tr class="'+readerWmacClass+'"><td>Reader WMAC</td><td>'+jsonDecode.old_values.readerWMac+'</td><td>'+jsonDecode.new_values.readerWMac+'</td></tr> \
                    <tr class="'+readerBmacClass+'"><td>Reader BMAC</td><td>'+jsonDecode.old_values.readerBMac+'</td><td>'+jsonDecode.new_values.readerBMac+'</td></tr> \
                    <tr class="'+readerGmacClass+'"><td>Reader GMAC</td><td>'+jsonDecode.old_values.readerGMac+'</td><td>'+jsonDecode.new_values.readerGMac+'</td></tr> \
                    <tr class="'+readeraccountID+'"><td>Account ID</td><td>'+jsonDecode.old_values.accountID+'</td><td>'+jsonDecode.new_values.accountID+'</td></tr> \
                    <tr class="'+readerPower+'"><td>Reader Power</td><td>'+jsonDecode.old_values.readerPower+'</td><td>'+jsonDecode.new_values.readerPower+'</td></tr> \
                    <tr class="'+readerType+'"><td>Reader Type</td><td>'+jsonDecode.old_values.readerType+'</td><td>'+jsonDecode.new_values.readerType+'</td></tr> \
                    <tr class="'+readerLastStatus+'"><td>Reader Last Status</td><td>'+jsonDecode.old_values.readerLastStatus+'</td><td>'+jsonDecode.new_values.readerLastStatus+'</td></tr> \                </tbody>';

    $("#modalTable").html(html);
}

function RULE_ADD(d){ 
    $("#modalTitle").html("Rule Added");
    var jsonDecode = $.parseJSON(d.data);
    var html = "<thead><tr><th>Column</th><th>Value</th></tr></thead> \
                <tbody> \
                    <tr><td>Rule Name</td><td>"+jsonDecode.ruleName+"</td></tr> \
                    <tr><td>Type</td><td>"+jsonDecode.ruleType+"</td></tr> \
                    <tr><td>Statement</td><td>"+jsonDecode.ruleStatement+"</td></tr> \
                    <tr><td>Alert Type</td><td>"+jsonDecode.ruleAlertType+"</td></tr> \
                    <tr><td>Account ID</td><td>"+jsonDecode.accountID+"</td></tr> \
                    <tr><td>Zone ID</td><td>"+jsonDecode.zoneID+"</td></tr> \
                    <tr><td>Tag ID</td><td>"+jsonDecode.tagID+"</td></tr> \
                    <tr><td>Reader ID</td><td>"+jsonDecode.readerID+"</td></tr> \
                    <tr><td>Rule Description</td><td>"+jsonDecode.ruleDescription+"</td></tr> \
                </tbody>";

    $("#modalTable").html(html);

}
function RULE_UPD(d){
    $("#modalTitle").html("Rule Updated");
    var jsonDecode      = $.parseJSON(d.data);
    var ruleNameClass        = "";
    var ruleTypeClass        = "";
    var ruleStatementClass   = "";
    var ruleAlertTypeClass   = "";
    var ruleAccountID        = "";
    var zoneIDClass          = "";
    var tagIDClass           = "";
    var readerIDClass        = "";
    var ruleDescriptionClass = "";
    if(jsonDecode.old_values.ruleName != jsonDecode.new_values.ruleName){
        ruleNameClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.ruleType != jsonDecode.new_values.ruleType){
        ruleTypeClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.ruleStatement != jsonDecode.new_values.ruleStatement){
        ruleStatementClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.ruleAlertType != jsonDecode.new_values.ruleAlertType){
        ruleAlertTypeClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.accountID != jsonDecode.new_values.accountID){
        ruleAccountID = "alert alert-danger";
    }
    if(jsonDecode.old_values.zoneID != jsonDecode.new_values.zoneID){
        zoneIDClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.tagID != jsonDecode.new_values.tagID){
        tagIDClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.readerID != jsonDecode.new_values.readerID){
        readerIDClass = "alert alert-danger";
    }
    if(jsonDecode.old_values.ruleDescription != jsonDecode.new_values.ruleDescription){
        ruleDescriptionClass = "alert alert-danger";
    }

    var html = '<thead><tr><th>Column</th><th>Previous Value</th><th>New Value</th></tr></thead> \
                <tbody> \
                    <tr class="'+ruleNameClass+'"><td>Rule Name</td><td>'+jsonDecode.old_values.ruleName+'</td><td>'+jsonDecode.new_values.ruleName+'</td></tr> \
                    <tr class="'+ruleTypeClass+'"><td>Type</td><td>'+jsonDecode.old_values.ruleType+'</td><td>'+jsonDecode.new_values.ruleType+'</td></tr> \
                    <tr class="'+ruleStatementClass+'"><td>Statement</td><td>'+jsonDecode.old_values.ruleStatement+'</td><td>'+jsonDecode.new_values.ruleStatement+'</td></tr> \
                    <tr class="'+ruleAlertTypeClass+'"><td>Alert Type</td><td>'+jsonDecode.old_values.ruleAlertType+'</td><td>'+jsonDecode.new_values.ruleAlertType+'</td></tr> \
                    <tr class="'+ruleAccountID+'"><td>Account ID</td><td>'+jsonDecode.old_values.accountID+'</td><td>'+jsonDecode.new_values.accountID+'</td></tr> \
                    <tr class="'+zoneIDClass+'"><td>Zone ID</td><td>'+jsonDecode.old_values.zoneID+'</td><td>'+jsonDecode.new_values.zoneID+'</td></tr> \
                    <tr class="'+tagIDClass+'"><td>Tag ID</td><td>'+jsonDecode.old_values.tagID+'</td><td>'+jsonDecode.new_values.tagID+'</td></tr> \
                    <tr class="'+readerIDClass+'"><td>Reader ID</td><td>'+jsonDecode.old_values.readerID+'</td><td>'+jsonDecode.new_values.readerID+'</td></tr> \
                    <tr class="'+ruleDescriptionClass+'"><td>Description</td><td>'+jsonDecode.old_values.ruleDescription+'</td><td>'+jsonDecode.new_values.ruleDescription+'</td></tr> \
                </tbody>';

    $("#modalTable").html(html);
}




$("#dataTables tbody").on('click', 'tr.tableRow', function(){
    var row     = table.row($(this));
    var data    = row.data();
    var func    = row.data().auditType;
    var fn      = window[func];
    $('#auditModel').modal('show');

    if(typeof fn === "function"){
        fn(data);
    }
})
