const core = require('@actions/core');

async function run() {
    try {
        const jsonResponse = JSON.parse(core.getInput('json'));
        core.info('Result is: ' + jsonResponse.status);
        if (jsonResponse.status > 0) {
            core.setFailed(jsonResponse.result.ErrorMessages);
        }
        core.setOutput('isSuccess', jsonResponse.status === 0 ? true : false);
        core.setOutput(
            'packageVersionId',
            jsonResponse.result.SubscriberPackageVersionId
        );
        core.info(
            'Package Version Id: ' +
                jsonResponse.result.SubscriberPackageVersionId
        );
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();