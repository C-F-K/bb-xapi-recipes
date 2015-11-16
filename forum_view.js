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
		id: "http://activitystrea.ms/schema/1.0/update",
		display: {
			"en-US": "updated"
		}
	},
	object: {
		objectType: "Activity",
		id: "",
		definition: {
			name: {
				"en-US": ""
			},
			type: "http://id.tincanapi.com/activitytype/message-state"
		}
	},
	result: {
		extensions: {}
	},
	context: {
		registration: "00000000-0000-0000-0000-000000000000",
		platform: "https://blackboard.uva.nl/",
		contextActivities: {
			parent: {},
			grouping: []
		}
	},
	timestamp: ""
};

// Transform script

var stateId = 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1 + '/';

var statement = clone(skeleton);

if (PARENT_MSGPK1 == null) {
	statement.object.id = stateId + MSGPK1 + '/state';
} else {
	statement.object.id = stateId + PARENT_MSGPK1 + '/' + MSGPK1 + '/state';
}

statement.actor.account.name = new String(USER_ID);
statement.object.definition.name["en-US"] = SUBJECT + ': state';
statement.result.extensions = {
	"http://id.tincanapi.com/extension/quality-rating": new String(RATING),
	"http://id.tincanapi.com/extension/views": new String(MSG_READ_COUNT)
};
statement.context.contextActivities.parent = {id: 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1 + '/' + MSGPK1};
statement.context.contextActivities.grouping = [
	{id: 'https://studiegids.uva.nl/' + SG_COURSE_ID + '/'},
	{id: 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1}
];
statement.timestamp = UPDATE_TIMESTAMP + '+01:00';

var data = JSON.stringify(statement);