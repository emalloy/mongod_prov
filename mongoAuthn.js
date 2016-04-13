// Add users needed for Mongo authentication.
// Refer to document http://docs.mongodb.org/v2.4/tutorial/enable-authentication/
// You must provide the host name or IP of the primary in the replica set as follows:
// You must also provide
// admin_user,admin_pass,db1,db2,db3,db_admin_user,db_admin_pass,rw_user,rw_pass,ro_user,ro_pass
// mongo -nodb --eval "primary='[primary]'" mongoAuthn.js
// For example, if the primary of the replica set is 10.10.120.121, execute the command like this:
// mongo -nodb --eval "primary='10.10.120.121'" mongoAuthn.js

// Step 0: Connect to the given primary.
var db = connect(primary + ":27017/admin");

// Step 1: Create the system user administrator.
// See http://docs.mongodb.org/v2.4/tutorial/add-user-administrator/
db.addUser(
	{
		user: admin_user,
		pwd: admin_pass,
		roles: ["userAdminAnyDatabase"]
	}
);

// Step 2: Create admin, reader, writer users for each database.
// See http://docs.mongodb.org/v2.4/tutorial/add-user-to-database/
addUsers(connect(primary + ":27017/" + db1));

addUsers(connect(primary + ":27017/" + db2));

addUsers(connect(primary + ":27017/" + db3));

// Add user function to add admin, writer and reader for each database.
function addUsers(database) {
	database.addUser(
		{
			user: db_admin_user,
			pwd: db_admin_pass,
			roles: [ "readWrite", "dbAdmin" ]
		}
	);

	database.addUser(
		{
			user: rw_user,
			pwd: rw_pass,
			roles: ["readWrite"]
		}
	);

	database.addUser(
		{
			user: ro_user,
			pwd: ro_pass,
			roles: ["read"]
		}
	);
}
