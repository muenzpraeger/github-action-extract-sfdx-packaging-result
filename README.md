# extract-sfdx-packaging-result

This Github Action is a helper action to extract JSON data from the `sfdx force:package:version:create` command.

## Inputs

The command exposes the input parameter `json`. Pass the value of the result of the `sfdx force:package:version:create` command there.

## Outputs

This action provides two outputs:

-   `isSuccess` - true if the result status code equals 0.
-   `packageVersionId` - the ID of the newly created package version.

## Example

```yml
# Authenticate package target org
- name: 'Create package version'
  id: package-version-create
  uses: forcedotcom/salesforcedx-actions@master
  with:
      args: 'force:package:version:create -p LWCRecipes -x -w 10 --json'

# Extract data from package version create result
- name: 'Extract package version create result data'
  id: extract-data-package-version-create
  uses: muenzpraeger/github-action-extract-sfdx-packaging-result@master
  with:
      json: ${{steps.package-version-create.outputs.result}}

- name: 'Install package version into test org'
  if: steps.extract-data.outputs.isSuccess
  id: package-version-install
  uses: forcedotcom/salesforcedx-actions@master
  with:
      args: 'force:package:install --package ${{ steps.extract-data-package-version-create.outputs.packageVersionId }} -w 10 -u packagingorg -r'
```
