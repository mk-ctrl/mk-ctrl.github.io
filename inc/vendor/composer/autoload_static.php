<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitaaea502ab8a8a365033f581987e055c8
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitaaea502ab8a8a365033f581987e055c8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitaaea502ab8a8a365033f581987e055c8::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}