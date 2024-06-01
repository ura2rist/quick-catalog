FROM php:8.2-fpm

# ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# RUN chmod +x /usr/local/bin/install-php-extensions && \
#     install-php-extensions gd xdebug

#ARG INSTALL_XDEBUG=false
#
#RUN if [ ${INSTALL_XDEBUG} = true ]; \
#    then \
#      pecl install xdebug && docker-php-ext-enable xdebug; \
#    fi;
#
#COPY ./xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

RUN docker-php-ext-install \
  pdo_mysql

# RUN install-php-extensions intl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash

COPY . .