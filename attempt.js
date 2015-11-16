// Start script

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

var xApiVersion = '1.0.1';

var assnTypes = {
	"assignment": "http://id.tincanapi.com/activitytype/school-assignment",
	"test": "http://adlnet.gov/expapi/activities/assessment",
	// extensible
};

var skeleton = {
	actor: {
		objectType: "Agent",
		account: {
			homePage: "https://secure.uva.nl",
			name: ""
		}
	},
	verb: {
		id: "http://adlnet.gov/expapi/verbs/attempted",
		display: {
			"en-US": "attempted"
		}
	},
	object: {
		objectType: "Activity",
		id: "",
		definition: {
			name: {
				"en-US": ""
			},
			type: ""
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

var assnType = assnTypes[TYPE] ? assnTypes[TYPE] : new String(TYPE);

var statement = clone(skeleton);

statement.actor.account.name = new String(USER_ID);
statement.object.id = 'https://blackboard.uva.nl/' + CRSMAIN_PK1 + CONTENT_PATH;
statement.object.definition.name["en-US"] = new String(TITLE);
statement.object.definition.type = assnType;
statement.context.contextActivities.grouping.id = 'https://studiegids.uva.nl/' + SG_COURSE_ID + '/';
statement.timestamp = ATTEMPT_TIMESTAMP + '+01:00';

var data = JSON.stringify(statement);