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
		id: "",
		display: {
			"en-US": ""
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
			grouping: []
		}
	},
	timestamp: ""
};

// Transform script

var postId = 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1 + '/';
var actType = 'http://id.tincanapi.com/activitytype/';
var parent = {id: 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1 + '/' + PARENT_MSGPK1};

var statement = clone(skeleton);

if (PARENT_MSGPK1 == null) {
	statement.verb.id = "http://activitystrea.ms/schema/1.0/post"
	statement.verb.display["en-US"] = "posted"
	statement.object.id = postId + MSGPK1;
	statement.object.definition.type = actType + 'topic';
} else {
	statement.verb.id = "http://adlnet.gov/expapi/verbs/responded"
	statement.verb.display["en-US"] = "responded"
	statement.object.id = postId + PARENT_MSGPK1 + '/' + MSGPK1;
	statement.object.definition.type = actType + 'forum-reply';
	statement.context.contextActivities.parent = parent;
}

statement.actor.account.name = new String(USER_ID);
statement.object.definition.name["en-US"] = new String(SUBJECT);
statement.context.contextActivities.grouping = [
	{id: 'https://studiegids.uva.nl/' + SG_COURSE_ID + '/'},
	{id: 'https://blackboard.uva.nl/' + CRSPK1 + '/' + FORUMMAIN_PK1}
];
statement.timestamp = POST_TIMESTAMP + '+01:00';

var data = JSON.stringify(statement);