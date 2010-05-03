<?php
/**
 * Setup model class.
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 3 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * @category   PHProjekt
 * @package    Htdocs
 * @subpackage Setup
 * @copyright  Copyright (c) 2010 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL v3 (See LICENSE file)
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @version    Release: @package_version@
 * @author     Gustavo Solt <solt@mayflower.de>
 */

/**
 * Setup model class.
 *
 * @category   PHProjekt
 * @package    Htdocs
 * @subpackage Setup
 * @copyright  Copyright (c) 2010 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL v3 (See LICENSE file)
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @version    Release: @package_version@
 * @author     Gustavo Solt <solt@mayflower.de>
 */
class Setup_Models_Setup
{
    /**
     * Array with erros.
     *
     * @var array
     */
    private $_error = array();

    /**
     * Array with messages.
     *
     * @var array
     */
    private $_message = array();

    /**
     * Constructor.
     *
     * @return void
     */
    public function __construct()
    {
        $this->_checkServer();
    }

    /**
     * Do some checks before install.
     *
     * @throws Expeption If the server don't have the requirements.
     *
     * @return void
     */
    private function _checkServer()
    {
        $missingRequirements = array();

        // The following extensions are either needed by components of the Zend Framework that are used
        // or by P6 components itself.
        $extensionsNeeded = array('mbstring', 'iconv', 'ctype', 'gd', 'pcre', 'pdo', 'Reflection', 'session', 'SPL',
            'zlib');

        // These settings need to be properly configured by the admin
        $settingsNeeded = array('magic_quotes_gpc' => 0, 'magic_quotes_runtime' => 0, 'magic_quotes_sybase' => 0);

        // These settings should be properly configured by the admin
        $settingsRecommended = array('register_globals' => 0, 'safe_mode' => 0);

        // Check the PHP version
        $requiredPhpVersion = "5.2.4";
        if (version_compare(phpversion(), $requiredPhpVersion, '<')) {
            // This is a requirement of the Zend Framework
            $missingRequirements[] = "PHP Version $requiredPhpVersion or newer";
        }

        foreach ($extensionsNeeded as $extension) {
            if (!extension_loaded($extension)) {
                $missingRequirements[] = "The $extension extension must be enabled.";
            }
        }

        // Check pdo library
        $mysql  = extension_loaded('pdo_mysql');
        $sqlite = extension_loaded('pdo_sqlite2');
        $pgsql  = extension_loaded('pdo_pgsql');

        if (!$mysql && !$sqlite && !$pgsql) {
            $missingRequirements[] = "You need one of these PDO extensions: pdo_mysql, pdo_pgsql or pdo_sqlite";
        }

        foreach ($settingsNeeded as $conf => $value) {
            if (ini_get($conf) != $value) {
                $missingRequirements[] = "The php.ini setting of \"$conf\" has to be \"$value\".";
            }
        }

        // Checking if configuration.ini exists
        $baseDir = str_replace('htdocs/setup.php', '', $_SERVER['SCRIPT_FILENAME']);
        if (file_exists($baseDir . "configuration.ini")) {
            throw new Exception("Configuration file found. Please, delete it before run setup again.");
        }

        if (!empty($missingRequirements)) {
            $message = implode("\n", $missingRequirements);
            throw new Exception($message);
        }

        if (strncmp($_SERVER['SCRIPT_NAME'], '/setup.php', 10) != 0) {
            $this->_message[] = "It is recommend install PHProjekt 6 using a virtual host.<br />"
                . "You should try to generate an extra virtual host (or a sub-domain) to phprojekt/htdocs.";

            // Works the .htaccess?
            $response = new Zend_Controller_Request_Http();
            $webpath  = $response->getHttpHost();
            $str      = '';
            $sock     = fsockopen($webpath, $response->getServer('SERVER_PORT'));
            $request  = "GET " . str_replace('htdocs', '', $response->getBasePath()) . "/ HTTP/1.1\r\n" .
               "Host: " . $webpath . "\r\nConnection: close\r\n\r\n";
            fwrite($sock, $request);
            while ($buff = fread($sock, 1024)) {
                $str .= $buff;
            }
            $response = Zend_Http_Response::fromString($str);
            if ($response->getStatus() != '403') {
                $this->_message[] = "Please note that your webserver needs to support .htaccess files "
                    . "to deny access to the configuration files.<br />"
                    . "Running PHProjekt 6 without using the provided .htaccess files to deny access to "
                    . "certain files and folders, might not be secure and is not recommended.";
            }
            fclose($sock);
        }

        foreach ($settingsRecommended as $conf => $value) {
            if (ini_get($conf) != $value) {
                $this->_message[] = "It is recommend to have \"$conf\" set to \"$value\", but it is not required "
                    . "to run PHProjekt.";
            }
        }
    }

    /**
     * Validate the params for the database.
     *
     * @param array $params Array with the POST values.
     *
     * @return boolean True for valid.
     */
    public function validateDatabase($params)
    {
        $valid = false;

        if (!isset($params['dbHost']) || empty($params['dbHost'])) {
            $this->_error[] = 'The database server address can not be empty';
        } else if (!isset($params['dbUser']) || empty($params['dbUser'])) {
            $this->_error[] = 'The database user can not be empty';
        } else if (!isset($params['dbName']) || empty($params['dbName'])) {
            $this->_error[] = 'The database name can not be empty';
        } else {
            try {
                $dbParams = array(
                    'host'     => $params['dbHost'],
                    'username' => $params['dbUser'],
                    'password' => $params['dbPass'],
                    'dbname'   => $params['dbName']
                );
                $db = Zend_Db::factory($params['serverType'], $dbParams);
                $db->getConnection();
                $valid = true;
            } catch (Exception $error) {
                $this->_error[] = 'Cannot connect to server at ' . $params['dbHost']
                    . ' using ' . $params['dbUser'] . ' user ' . '(' . $error->getMessage() . ')';
            }
        }

        return $valid;
    }

    /**
     * Save the database params into the SESSION.
     *
     * @param array $params Array with the POST values.
     *
     * @return void
     */
    public function saveDatabase($params)
    {
        $this->_saveSession('databaseData', $params);
    }

    /**
     * Validate the params for the users.
     *
     * @param array $params Array with the POST values.
     *
     * @return boolean True for valid.
     */
    public function validateUsers($params)
    {
        $valid = true;

        // Admin pass
        if (!isset($params['adminPass']) || empty($params['adminPass'])) {
            $this->_error[] = 'The admin password cannot be empty';
            $valid = false;
        } else if ($params['adminPassConfirm'] != $params['adminPass']) {
            $this->_error[] = 'The admin password and confirmation are different';
            $valid = false;
        }

        // Test pass
        if (!isset($params['testPass']) || empty($params['testPass'])) {
            $this->_error[] = 'The test password cannot be empty';
            $valid = false;
        } else if ($params['testPassConfirm'] != $params['testPass']) {
            $this->_error[] = 'The test password and confirmation are different';
            $valid = false;
        }

        // Test pass
        if ($params['adminPass'] == $params['testPass']) {
            $this->_error[] = 'The password for the users "admin" and "test" should be different';
            $valid = false;
        }

        return $valid;
    }

    /**
     * Save the users params into the SESSION.
     *
     * @param array $params Array with the POST values.
     *
     * @return void
     */
    public function saveUsers($params)
    {
        $this->_saveSession('usersData', $params);
    }

    /**
     * Validate the params for the server.
     *
     * @param array $params Array with the POST values.
     *
     * @return boolean True for valid.
     */
    public function validateServer($params)
    {
        $valid = true;

        // Check write access
        $baseDir    = str_replace('htdocs/setup.php', '', $_SERVER['SCRIPT_FILENAME']);
        $configFile = $baseDir . "configuration.ini";

        if (!file_exists($configFile)) {
            if (!is_writable($baseDir)) {
                $this->_error[] = 'Error creating the configuration file at '. $configFile
                    . ': Do not have write access.';
                $valid = false;
            } else {
                if (!file_put_contents($configFile, "Test")) {
                    $this->_error[] = 'Error creating the configuration file at '. $configFile;
                    $valid = false;
                } else {
                    unlink($configFile);
                }
            }
        }

        // Check log files
        if (!$this->_checkWriteAccess($baseDir, 'logs')) {
            $valid = false;
        } else {
            if (!@fopen($baseDir . 'logs' . DIRECTORY_SEPARATOR . 'debug.log', 'a', false)) {
                $this->_error[] = 'The debug log cannot be created';
                $valid = false;
            }
            if (!@fopen($baseDir . 'logs' . DIRECTORY_SEPARATOR . 'err.log', 'a', false)) {
                $this->_error[] = 'The err log can not be created';
                $valid = false;
            }
        }

        // Check upload dir
        if (!$this->_checkWriteAccess($baseDir, 'upload')) {
            $valid = false;
        }

        // Check tmp dir
        if (!$this->_checkWriteAccess($baseDir, 'tmp')) {
            $valid = false;
        }

        // Check zendCache dir
        if (!$this->_checkWriteAccess($baseDir . 'tmp' . DIRECTORY_SEPARATOR, 'zendCache')) {
            $valid = false;
        } else {
            // Remove old data if exists
            $cacheDir = $baseDir . 'tmp' . DIRECTORY_SEPARATOR . 'zendCache';
            if ($directory = opendir($cacheDir)) {
                while (($file = readdir($directory)) !== false) {
                    if ($file == '.' || $file == '..') {
                        continue;
                    }
                    unlink($cacheDir . DIRECTORY_SEPARATOR . $file);
                }
            }
        }

        return $valid;
    }

    /**
     * Check if the folder exists and have write access.
     *
     * If not, try to create it.
     *
     * @param string $baseDir Path to the folder.
     * @param string $folder  Folder name.
     *
     * @return boolean True if the folder is writable.
     */
    private function _checkWriteAccess($baseDir, $folder)
    {
        $valid = false;
        $path  = $baseDir . $folder;

        if (!is_dir($path)) {
            if (!is_writable($baseDir)) {
                $this->_error[] = 'Error creating the "' . $folder . '" folder: Do not have write access.';
            } else if (!mkdir($path)) {
                $this->_error[] = 'Please create the dir ' . $path . '.';
            } else {
                $valid = true;
            }
        } else if (!is_writable($path)) {
            $this->_error[] = 'Please set write permission to ' . $path . '.';
        } else {
            $valid = true;
        }

        return $valid;
    }

    /**
     * Install all the tables and return the messages generated.
     *
     * @param array $params Array with options for the install.
     *
     * @return array Array with messages of what was installed.
     */
    public function install($params)
    {
        $options                 = array();
        $options['useExtraData'] = (boolean) $params['useExtraData'];
        $db                      = $this->_getDb();

        // Install tables
        $dbParser           = new Phprojekt_DbParser($options, $db);
        $dbParser->parseData(PHPR_ROOT_PATH . DIRECTORY_SEPARATOR . 'application');

        // Update users passwords
        $usersNamespace = new Zend_Session_Namespace('usersData');

        // Update admin Pass
        $db->update('setting', array('value' => md5('phprojektmd5' . $usersNamespace->data['adminPass'])),
            'id = 1');

        // Update test Pass
        $db->update('setting', array('value' => md5('phprojektmd5' . $usersNamespace->data['testPass'])),
            'user_id = 2 AND key_value = \'password\'');

        return $dbParser->getMessages();
    }

    /**
     * Validate the params for the migration.
     *
     * @param array $params Array with the POST values.
     *
     * @return boolean True for valid.
     */
    public function validateMigration($params)
    {
        $valid = true;

        if (!empty($params['migrationConfigFile'])) {
            if (!file_exists($params['migrationConfigFile'])) {
                $this->_error[] = 'The file "' . $params['migrationConfigFile'] . '" do not exists.';
                $valid = false;
            } else if (!strstr($params['migrationConfigFile'], 'config.inc.php')) {
                $this->_error[] = 'The file "' . $params['migrationConfigFile'] . '" do not exists.';
                $valid = false;
            }
        } else {
            $this->_error[] = 'You must provide the path to the config.inc.php file of your old PHProjekt 5.x.';
            $valid = false;
        }

        return $valid;
    }

    /**
     * Migrate old versions to the new one.
     *
     * @param array $params Array with options for the migration.
     *
     * @return array Array with messages of what was migrated.
     */
    public function migrate($params)
    {
        if (file_exists($params['migrationConfigFile'])) {
            try {
                $migration = new Setup_Models_Migration($params['migrationConfigFile'], $params['diffToUtc'],
                    $this->_getDb());
                $migration->{'migrate' . $params['module']}();
            } catch (Exception $error) {
                echo $error->getMessage();
            }
        }
    }

    /**
     * Complete the installation writing the config file.
     *
     * @return void
     */
    public function finish()
    {
        // Create config file
        $databaseNamespace = new Zend_Session_Namespace('databaseData');
        $config            = new Setup_Models_Config();
        $content           = $config->getDefaultProduction($databaseNamespace->data['dbUser'],
            $databaseNamespace->data['dbPass'], $databaseNamespace->data['dbName'], 'Pdo_Mysql',
            $databaseNamespace->data['dbHost']);

        $baseDir    = str_replace('htdocs/setup.php', '', $_SERVER['SCRIPT_FILENAME']);
        $configFile = $baseDir . "configuration.ini";
        file_put_contents($configFile, $content);

        // Delete a session if exists
        $_SESSION = array();
        foreach ($_COOKIE as $key => $value) {
            setcookie($key, "", 1);
        }
        Zend_Session::writeClose();
    }

    /**
     * Return the errors created by validate().
     *
     * @return array Array with errors.
     */
    public function getError()
    {
        $error        = $this->_error;
        $this->_error = array();

        return $error;
    }

    /**
     * Return the messages created by _checkServer().
     *
     * @return array Array with messages.
     */
    public function getMessage()
    {
        $message        = $this->_message;
        $this->_message = array();

        return $message;
    }

    /**
     * Return the database connection.
     *
     * @return Zend_Db The database conection.
     */
    private function _getDb()
    {
        $databaseNamespace = new Zend_Session_Namespace('databaseData');

        $dbParams = array(
                    'host'     => $databaseNamespace->data['dbHost'],
                    'username' => $databaseNamespace->data['dbUser'],
                    'password' => $databaseNamespace->data['dbPass'],
                    'dbname'   => $databaseNamespace->data['dbName']);

        return Zend_Db::factory($databaseNamespace->data['serverType'], $dbParams);
    }

    /**
     * Save a value into the session
     *
     * @param string $name  Namespace for the session.
     * @param mix    $value Mix value to save.
     *
     * @return void
     */
    private function _saveSession($name, $value)
    {
        $namespace       = new Zend_Session_Namespace($name);
        $namespace->data = $value;
    }
}
