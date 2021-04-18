# Action-Unity-Bump-iOS-Build-Number
[![build-test](https://github.com/KCFindstr/Action-Unity-Bump-iOS-Build-Number/workflows/build-test/badge.svg)](https://github.com/KCFindstr/Action-Unity-Bump-iOS-Build-Number/actions) [![codecov](https://codecov.io/gh/KCFindstr/Action-Unity-Bump-iOS-Build-Number/branch/main/graph/badge.svg)](https://codecov.io/gh/KCFindstr/Action-Unity-Bump-iOS-Build-Number)

This github action increases iOS build number in Unity's ProjectSettings by 1.

## Inputs

### `ProjectSettingsPath`

**Required** Path to the `ProjectSettings.asset` file. Default `./ProjectSettings/ProjectSettings.asset`.

## Outputs

### `oldBuildNumber`

The original iOS build number before bumping.

### `newBuildNumber`

The new iOS build number after bumping.

## Example usage
```
uses: KCFindstr/Action-Unity-Bump-iOS-Build-Number@v0.3
with:
  ProjectSettingsPath: './ProjectSettings/ProjectSettings.asset'
```