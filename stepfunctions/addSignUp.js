import Dynamo from '../common/Dynamo';
const tableName = process.env.signupTableName;
import { v4 as uuid } from 'uuid'; // Import V4 version from uuid.

exports.handler = async event => {
    const email = event.Input.email;
    const ID = uuid();
    await Dynamo.put({ email, ID, played: 'false'}, tableName);
    return { ID }; // In step function, if any of the lambda function need to get SignUp it will get it because we have returned it.
};

