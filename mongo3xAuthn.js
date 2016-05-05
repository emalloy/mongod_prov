// add the admin user
var db = connect(primary + ":27017/admin");


db.createUser( { "user" : admin_user,
        "pwd": admin_pass,
        "roles" : [ { role: "clusterAdmin", db: "admin" },
            { role: "readAnyDatabase", db: "admin" },
            "readWrite"
        ] },
    { w: "majority" , wtimeout: 5000 } )

// add the dbAdmin user on the db1 var

addUsers(connect(primary + ":27017/" + db1));

function addUsers(database) {
    database.createUser( { "user" : db_admin_user,
            "pwd": db_admin_pass,
            "roles" : [ { role: "dbAdmin", db: db1 },
                "readWrite"
            ] },
        { w: "majority" , wtimeout: 5000 }
    );
}