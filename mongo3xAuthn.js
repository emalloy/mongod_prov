var db = connect(primary + ":27017/admin");


db.createUser( { "user" : admin_user,
        "pwd": admin_pass,
        "roles" : [ { role: "clusterAdmin", db: "admin" },
            { role: "readAnyDatabase", db: "admin" },
            "readWrite"
        ] },
    { w: "majority" , wtimeout: 5000 } )