$(function () {
    $.validator.addMethod("regex", function (value, element, regexpr) {
        return regexpr.test(value);
    });
    jQuery.validator.addMethod("isValidPhoneNo", function (value, element) {
        return $("#phoneno").intlTelInput("isValidNumber"); // return true if field is ok or should be ignored
    });
});

$(document).ready(function(){

    $.validator.addMethod("needsSelection", function (value, element) {
        var count = $(element).find('option:selected').length;

        return length > 0;
    });

/*  Validation use for Add and edit Account  */
        $("#addAccount").validate({
        rules:{
            name:{
                required: true,
                regex: /^[a-zA-Z ]{3,50}$/,
            },
            email:{
                required: true,
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$|^[0-9]{5,15}$/,
            },
            contactNo:{
                required: true 
            }, 
            phone:{
                required: true,
                regex: /^[0-9]{10,10}$/,
                maxlength: 10,
                minlength:6
            },
            address:{
                required: true
            },
            flag:{
                required: true
            }
        },
        messages:{
            name:{
                required: "Account Name is Required.",
                regex: "Enter valid name"
            },
            email:{
                required: "Account Email ID is Required.",
                regex: "Enter valid Email Id"
            }, 
            contactNo:{
                required: "Account Name is Required."
            }, 
            phone:{
                required: "Please Enter Phone.",
                regex: "Enter valid contact number",
                maxlength: "Maximum 10 Digits",
                minlength:"Minimum 6 Digits"
            },
            address:{
                required: "Please Enter Address."
            },
            flag:{
                required: "Please select notification flag."
            }
        }
    })


    /*  Validation use for Add and edit Users  */   
        $("#addUser").validate({
        rules:{
            username:{
                required: true,
                regex: /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-|)[a-zA-Z0-9])*[a-zA-Z0-9]*$/,
            },
            email:{
                required: true,
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$|^[0-9]{5,15}$/,
            }, 
            phone:{
                required: true,
                regex: /^[0-9]{10,10}$/,
                maxlength: 10,
                minlength:6
            },
            accountID:{
                required: true
            },
            role:{
                required: true
            },
            type:{
                required: true
            },
            notifyEmail:{
                required: true
            },
            notifyPhone:{
                required: true
            }
        },
        messages:{
            username:{
                required: "Username is Required.",
                regex: "Enter valid username"
            },
            email:{
                required: "Account Email ID is Required.",
                regex: "Enter valid Email Id"
            }, 
            phone:{
                required: "Please Enter Phone.",
                regex: "Enter valid contact number",
                maxlength: "Maximum 10 Digits",
                minlength:"Minimum 6 Digits"
            },
            accountID:{
                required: "Please select account."
            },
            role:{
                required: "Please select user role."
            },
            type:{
                required: "Please select user type."
            },
            notifyEmail:{
                required: "Please select for notification email."
            },
            notifyPhone:{
                required: "Please select for notification phone."
            }
        }
    })

    /*  Validation use for Add and edit Users  */   
        $("#addUserRole").validate({
        rules:{
            name:{
                required: true,
                regex: /^[a-zA-Z ]{3,50}$/,
            },
            status:{
                required: true
            }
        },
        messages:{
            name:{
                required: "User role name is required.",
                regex: "Enter valid name"
            },
            status:{
                required: "Please select permission flag."
            }
        }
    })

    /*  Validation use for Add and edit Users  */   
    $("#addPermission").validate({
        rules:{
            role:{
                required: true
            }
        },
        messages:{
            
            role:{
                required: "Please select user role."
            }
        }
    })

     /*  Validation use for Add and edit Zone  */   
        $("#addZone").validate({
            rules:{
                zone_name:{
                    required: true
                },
                zone_type:{
                    required: true
                }
            },
            messages:{
                zone_name:{
                    required: "Please Enter Zone Name."
                },
                zone_type:{
                    required: "Please select Zone Type."
                }
            }
        })

        /*  Validation use for Add and edit Reader  */   
    $("#addReader").validate({
        rules:{
           
            reader_type:{
                required: true
            },
            reader_wmac:{
                required: true,
                regex: /^[a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}$/,
            },
            reader_bmac:{
                required: true,
                regex: /^[a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}$/,
            },
            reader_power:{
                required: true
            }
        },
        messages:{
            reader_type:{
                required: "Reader Type required."
            },
            reader_wmac:{
                required: "Reader WIFI MAC required",
                regex: "Enter valid Format - AA:AA:AA:AA:AA:AA"
            },
            reader_bmac:{
                required: "Reader WIFI MAC required",
                regex: "Enter valid Format - AA:AA:AA:AA:AA:AA"
            }, 
            reader_power:{
                required: "Select Reader Power"
            }
        }
    });


    $("#addTag").validate({
        rules:{           
            tag_serial:{
                required: true,
                regex: /^[1-9]\d{9}$/,
            },
            tag_user_id:{
                required: true
            },
            tag_mac:{
                required: true,
                regex: /^[a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}[:][a-zA-Z]{2}$/,
            },
        },
        messages:{
            tag_serial:{
                required: "Tag Serial No required."                
            },
            tag_user_id:{
                required: "Select User Tag"
            },
            tag_mac:{
                required: "Tag MAC required",
                regex: "Enter valid Format - AA:AA:AA:AA:AA:AA"
            },
        }
    });

    $("#addRule").validate({
        rules:{           
            ruleName:{
                required: true,
            },
            ruleType:{
                required: true
            },
            ruleStatement:{
                required: true,
            },
            ruleReaderCode:{
                required: true,
            },
            ruleTagCode:{
                required: true,
            },
            ruleTime:{
                required: true,
            },
            accountID:{
                required: true,
            },
            zoneID:{
                required: true,
            },
            tagID:{
                required: true,
            },
            readerID:{
                required: true,
            },
            ruleOther:{
                required: true,
            },
            ruleEmail:{
                required: true,
                regex:/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/
            },
            rulePhoneNo:{
                required: true,
                regex: /^[0-9]+(?:-[0-9]+)?(,[0-9]+(?:-[0-9]+)?)*$/
            },
        },
        messages:{
            ruleName:{
                required: "Enter Rule Name"                
            },
            ruleType:{
                required: "Select rule type"
            },
            ruleStatement:{
                required: "Enter rule statement",
            },
            ruleReaderCode:{
                required: "Enter rule reader code",
            },
            ruleTagCode:{
                required: "Enter rule tag code",
            },
            ruleTime:{
                required: "Enter rule time",
            },
            accountID:{
                required: "Select account name",
            },
            zoneID:{
                required: "Select zone name",
            },
            tagID:{
                required: "Select Tag Serial number",
            },
            readerID:{
                required: "Select Reader Serial number",
            },
            ruleOther:{
                required: "Enter URL",
            },
            ruleEmail:{
                required: "Enter email id with comma seperator",
                regex: "Enter valid email id",
            },
            rulePhoneNo:{
                required: "Enter phone number with comma seperator",
                regex: "Enter valid phone number",
            },
        }
    });

});
