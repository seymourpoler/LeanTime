# git_commit

Automatically stage all changes and commit with a generated message summarizing the updated files.

```sh
git add -A
git commit -m "$(git diff --cached --name-only | awk '{print \"Update: \"$0}' | paste -sd ', ' -)"
```
