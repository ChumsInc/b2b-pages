<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once ('access.inc.php');

$bodyPath = "apps/b2b-pages";
$title = "B2B Pages";
$description = "";

$ui = new WebUI($bodyPath, $title, $description, true, 5);
$ui->version = "2019-03-07";
$ui->bodyClassName = 'container-fluid';
$ui->AddCSS("public/css/styles.css");
$ui->addManifest('public/js/manifest.json');
/**
 * Changelog:
 */


$ui->Send();
