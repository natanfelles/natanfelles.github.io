---
title: GeoIP Utils
layout: post
categories: desenvolvimento
image: geoip.png
tags: php geoip debian linux
lang: en
---

The GeoIP extension allows you to find the location of an IP address. City, State, Country, Longitude, Latitude, and other information as all, such as ISP and connection type can be obtained with the help of GeoIP.

## Installation

To use GeoIP with PHP we need install it first. In Debian based systems is very easy, just run:

```
sudo apt-get install geoip-database-contrib php-geoip
```

I choose by the GeoIP contrib package because it is more updated.

## Example

{: .file-excerpt }
PHP file:
:   ```php
    <?php
    // GitHub IP Address
    $hostname = '192.30.252.129';

    // Get basic info about $hostname
    $record = geoip_record_by_name($hostname);
    
    if ($record) {
        echo "Record: ";
        print_r($record);
    }

    // Get timezone from $record
    $timezone = @geoip_time_zone_by_country_and_region(
        $record['country_code'],
        $record['region']
    );
    
    if ($timezone) {
        echo "Timezone: {$timezone}\n";
    }

    // Get region name from $record
    $region = @geoip_region_name_by_code(
        $record['country_code'],
        $record['region']);if ($region
    ) {
        echo "Region: {$region}\n";
    }

    // Get the ASN from $hostname
    $asn = geoip_asnum_by_name($hostname);
    
    if ($asn) {
        echo "ASN: {$asn}";
    }
    ```

> You can use the `$_SERVER['REMOTE_ADDR']` as hostname if you want get info about your visitor.

### Output:

```
Record: Array
(
    [continent_code] => NA
    [country_code] => US
    [country_code3] => USA
    [country_name] => United States
    [region] => CA
    [city] => San Francisco
    [postal_code] => 94107
    [latitude] => 37.76969909668
    [longitude] => -122.39330291748
    [dma_code] => 807
    [area_code] => 415
)
Timezone: America/Los_Angeles
Region: California
ASN: AS36459 GitHub, Inc.
```

## Thinking About

GeoIP is a very good tool to monitor access in your web applications and if you do not work with PHP do not angry. Has a lot of availables API’s in various languages. See the official documentation.

## Documentation:

- [MaxMind](http://dev.maxmind.com/geoip/)
- [Debian GeoIP (Contrib)](https://packages.debian.org/jessie/geoip-database-contrib)
- [Debian GeoIP module for PHP5](https://packages.debian.org/jessie/php5-geoip)
- [PHP](http://php.net/manual/pt_BR/intro.geoip.php)
- [Gist](https://gist.github.com/natanfelles/d5b09be51a873daebd6e645ca63faeb2)
