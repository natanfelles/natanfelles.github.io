#!/bin/bash
# Author: Natan Felles <natanfelles@gmail.com>
# Description: Serve Jekyll According to Environment

echo -n "Environment [d = development, p = production]: "
read ENV

rm Gemfile.lock
rm -r _site/

if [[ $ENV != "p" ]]; then
    echo "Building development site:"
    JEKYLL_ENV=development bundle exec jekyll serve --config _config_dev.yml --incremental
else
    echo "Building production site:"
    JEKYLL_ENV=production bundle exec jekyll serve --incremental
fi
