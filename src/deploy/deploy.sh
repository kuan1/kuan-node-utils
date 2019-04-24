#!/usr/bin/env sh

# abort on errors
set -e

dist=$1
repository=$2
branch=$3
num=3

if [ $# -ne $num ];then
  echo "【exec error】参数长度: $num, 当前长度: $#"
  exit
fi

echo "【exec】$dist is pushing $repository $branch..."

# navigate into the build output directory
cd $dist

# git init
# git add -A
# git commit -m 'deploy'

# git push -f $repository $branch

echo "success!"

cd -