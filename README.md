# Action-Unity-Bump-iOS-Build-Number
This github action increases iOS build number in Unity's ProjectSettings by 1.

## Inputs

### `ProjectSettingsPath`

**Required** Path to the `ProjectSettings.asset` file. Default `./ProjectSettings/ProjectSettings.asset`.

## Outputs

### `newBuildNumber`

The new iOS build number after bumping.

## Example usage
```
uses: KCFindstr/Action-Unity-Bump-iOS-Build-Number@v0.1
with:
  ProjectSettingsPath: './ProjectSettings/ProjectSettings.asset'
```