#!/usr/bin/env sh

# abort on errors
set -e

dist=$1
repository=$2
branch=$3
num=3

echo "【exec】$dist is pushing $repository $branch"

if [ $# -ne $num ];then
  echo "【exec error】参数长度: $num, 当前长度: $#"
  exit
fi

# navigate into the build output directory
cd $dist

gitDir=".git"
if [ ! -d gitDir ];then
  git init
fi

git add .
git commit -am 'deploy'

git push -f $repository master:$branch

echo "success push $repository $branch !"

cd -