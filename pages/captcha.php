<?php

    session_start();

    $captcha = rand(1000, 9999);
    $_SESSION['captcha'] = $captcha;

    header("Content-type: image/png"); //ustawienie nagłówka strony
    $im = imagecreate(60, 30); //utworzenie canvasa 
    $black = imagecolorallocate($im, 0, 0, 0); //alokacja koloru r,g,b
    $white = imagecolorallocate($im, 255, 255, 255); //alokacja koloru r,g,b
    imagestring($im, 10, 11, 7,  $captcha, $white); //wypisanie tekstu
    //rysowanie linii przerywanej
    $style = array($black, $white, $black, $white); //tablica kolejnych pixeli stylu
    imagesetstyle($im, $style); //ustawienie stylu
    for ($i = 0; $i < 15; $i++) {
        imageline($im, 0, $i*2, 100, $i*2, IMG_COLOR_STYLED);
    }
    imagepng($im); //generowanie png
    imagedestroy($im); //zwolnienie pamięci

?>