import Dynamo from '../common/Dynamo';
const tableName = process.env.signupTableName;

exports.handler = async event => {
    const ID = event.Input.ID;
    const row = await Dynamo.get({ ID }, tableName);
    return row;
};

