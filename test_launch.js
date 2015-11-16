// Start script

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

var xApiVersion = '1.0.1';

var skeleton = {
	actor: {
		objectType: "Agent",
		account: {
			homePage: "https://secure.uva.nl",
			name: ""
		}
	},
	verb: {
		id: "http://adlnet.gov/expapi/verbs/launched",
		display: {
			"en-US": "launched"
		}
	},
	object: {
		objectType: "Activity",
		id: "",
		definition: {
			name: {
				"en-US": ""
			},
			type: "http://adlnet.gov/expapi/activities/assessment"
		}
	},
	context: {
		registration: "00000000-0000-0000-0000-000000000000",
		platform: "https://blackboard.uva.nl/",
		contextActivities: {
			grouping: {
				id: ""
			}
		}
	},
	timestamp: ""
};

// Transform script

var statement = clone(skeleton);

statement.actor.account.name = new String(USER_ID);
statement.object.id = 'https://blackboard.uva.nl/' + COURSE_PK1 + CONTENT_PATH;
statement.object.definition.name["en-US"] = new String(CONTENT_TITLE);
statement.context.contextActivities.grouping.id = 'https://studiegids.uva.nl/' + SG_COURSE_ID + '/';
statement.timestamp = TIMESTAMP + '+01:00';

var data = JSON.stringify(statement);