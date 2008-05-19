<?php
/**
 * Unit test
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id:
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
*/
require_once 'PHPUnit/Framework.php';

/**
 * Tests Converter class
 *
 * @copyright  Copyright (c) 2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     Eduardo Polidor <polidor@mayflower.de>
 */
class Phprojekt_ConverterTest extends PHPUnit_Framework_TestCase
{
    /**
     * Test json converter
     *
     */
    public function testConvert()
    {
        $converted = substr('{}&&({"metadata":[{"key":"title","label":"Title","type":',0,23);

        $authNamespace = new Zend_Session_Namespace('PHProjekt_Auth');
        $authNamespace->userId = 1;

        $object = Phprojekt_Loader::getModel('Project', 'Project');

        $records = $object->fetchAll(null, null, 20, 0);

        $json = new Phprojekt_Converter_Json();
        $data = $json->convert($records);

        $this->assertEquals($converted, substr($data,0,23));
    }

    /**
     * Test json convert tree
     *
     */
    public function testConvertTree()
    {
        $converted = substr('{}&&({"identifier":"id","label":"name","items":[{"name"',0,23);

        $authNamespace = new Zend_Session_Namespace('PHProjekt_Auth');
        $authNamespace->userId = 1;

        $object = Phprojekt_Loader::getModel('Project', 'Project');

        $tree = new Phprojekt_Tree_Node_Database($object, 1);
        $tree->setup();

        $json = new Phprojekt_Converter_Json();
        $data = $json->convert($tree);

        $this->assertEquals($converted, substr($data,0,23));
    }

    /**
     * Test json convertion of single value
     *
     */
    public function testConvertValue()
    {
        $json = new Phprojekt_Converter_Json();

        $data = 'This is a test of convetion';
        $converted = '{}&&("This is a test of convetion")';
        $result = $json->convert($data);
        $this->assertEquals($converted, $result);

        $data = array('This is a test of convetion');
        $converted = '{}&&(["This is a test of convetion"])';
        $result = $json->convert($data);
        $this->assertEquals($converted, $result);
    }
}