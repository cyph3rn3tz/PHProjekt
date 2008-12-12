<?php
/**
 * Test suite for the default module
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    CVS: $Id$
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */

if (!defined('PHPUnit_MAIN_METHOD')) {
    define('PHPUnit_MAIN_METHOD', 'Default_AllTests::main');
}

require_once 'PHPUnit/Framework.php';
require_once 'PHPUnit/TextUI/TestRunner.php';

// require_once 'Controllers/BaseTest.php';
require_once 'Controllers/IndexControllerTest.php';
require_once 'Controllers/LoginControllerTest.php';
require_once 'Controllers/TagControllerTest.php';
require_once 'Controllers/SearchControllerTest.php';
require_once 'Models/DefaultTest.php';

/**
 * Test suite for the default module
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     David Soria Parra <soria_parra@mayflower.de>
 */
class Default_AllTests
{
    /**
     * Runs the test suite
     *
     */
    public static function main()
    {
        PHPUnit_TextUI_TestRunner::run(self::suite());
    }

    /**
     * Builds the test suite containing all
     * tests of this module and returns the suite
     *
     * @return PHPUnit_Framework_TestSuite
     */
    public static function suite()
    {
        $suite = new PHPUnit_Framework_TestSuite('Default Controller');

        $suite->addTestSuite('Phprojekt_DefaultModelDefault_Test');
        $suite->addTestSuite('Phprojekt_IndexController_Test');
        $suite->addTestSuite('Phprojekt_TagController_Test');
        $suite->addTestSuite('Phprojekt_SearchController_Test');
        $suite->addTestSuite('Phprojekt_LoginController_Test');

        return $suite;
    }
}

if (PHPUnit_MAIN_METHOD == 'Default_AllTests::main') {
    Framework_AllTests::main();
}
