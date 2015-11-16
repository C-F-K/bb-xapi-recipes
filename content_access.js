// Start script

function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}

var xApiVersion = '1.0.1'

var skeleton = {
	actor: {
		objectType: "Agent",
		account: {
			homePage: "https://secure.uva.nl",
			name: ""
		}
	},
	verb: {
		id: "http://activitystrea.ms/schema/1.0/access",
		display: {
			"en-US": "accessed"
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

var fileType = FILE_NAME == null ? 'http://activitystrea.ms/schema/1.0/article' : 'http://activitystrea.ms/schema/1.0/file'
var contentType = IS_FOLDER == 'Y' ? 'http://activitystrea.ms/schema/1.0/collection' : fileType;
var contentId = 'https://blackboard.uva.nl/' + COURSE_PK1;
if (CONTENT_PATH == null) {
	contentId = contentId + '/' + CONTENT_PK1;
} else {
	contentId = contentId + CONTENT_PATH;
}

var statement = clone(skeleton);

statement.actor.account.name = new String(USER_ID);
statement.object.id = contentId;
statement.object.definition.name["en-US"] = new String(CONTENT_TITLE);
statement.object.definition.type = contentType;
statement.context.contextActivities.grouping.id = 'https://studiegids.uva.nl/' + SG_COURSE_ID + '/';
statement.timestamp = TIMESTAMP + '+01:00';

var data = JSON.stringify(statement);