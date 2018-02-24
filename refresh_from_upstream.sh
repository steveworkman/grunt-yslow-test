git remote add upstream https://github.com/steveworkman/grunt-yslow-test.git

git remote -v

# Fetch all the branches of that remote into remote-tracking branches,
# such as upstream/master:
#!/bin/bash
#set -xv

# Add the remote, call it "upstream":

#git remote update
git fetch upstream

# Make sure that you're on your master branch:

git checkout master

# Rewrite your master branch so that any commits of yours that
# aren't already in upstream/master are replayed on top of that
# other branch:

git rebase upstream/master
#git rebase origin/develop
git rebase --continue

#Clean and restart from scratch
#git reset --hard upstream/master
#git reset --hard origin/master

git push origin master --force

#git branch --set-upstream-to master origin/master

exit 0
