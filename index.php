<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

use chums\ui\WebUI2;
use chums\user\Groups;

require_once("autoload.inc.php");

$ui = new WebUI2([
    'title' => 'B2B Pages Editor',
    'bodyClassName' => 'container-fluid',
    "contentFile" => 'body.inc.php',
    "requiredRoles" => [Groups::ADMIN],
]);
$ui->addManifestJSON('public/js/manifest.json')
    ->render();
