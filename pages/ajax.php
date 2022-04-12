<?php

    session_start();

    try{
        $dbh = new PDO('mysql:dbname=bwypart;host=inf16.tl.krakow.pl', 'bwypart', 'bwypart');

        if (isset($_POST['acc'])) {

            switch($_POST['acc']) {

                case "get":
                    $sth = $dbh->prepare("SELECT * FROM monetki");
                    $sth->execute();
                    $res = $sth->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode($res);
                break;

                case "add":
                if ($_POST['captcha'] == $_SESSION['captcha']) {
                    $sth = $dbh->prepare("INSERT INTO monetki(flaga, nominal, nr, stop, rok) VALUES(:f, :n, :nr, :s, :r)");
                    $sth->bindParam(':f', $_POST['flaga'], PDO::PARAM_STR);
                    $sth->bindParam(':n', $_POST['nominal'], PDO::PARAM_STR);
                    $sth->bindParam(':nr', $_POST['nr'], PDO::PARAM_STR);
                    $sth->bindParam(':s', $_POST['stop'], PDO::PARAM_STR);
                    $sth->bindParam(':r', $_POST['rok'], PDO::PARAM_STR);
                    $sth->execute();
                }

                break;

                case "update":
                if ($_POST['captcha'] == $_SESSION['captcha']) {
                $sth = $dbh->prepare("UPDATE monetki SET flaga=:f, nominal=:n, nr=:nr, stop=:s, rok=:r WHERE id=:id");
                    $sth->bindParam(':f', $_POST['flaga'], PDO::PARAM_STR);
                    $sth->bindParam(':n', $_POST['nominal'], PDO::PARAM_STR);
                    $sth->bindParam(':nr', $_POST['nr'], PDO::PARAM_STR);
                    $sth->bindParam(':s', $_POST['stop'], PDO::PARAM_STR);
                    $sth->bindParam(':r', $_POST['rok'], PDO::PARAM_STR);
                    $sth->bindParam('id', $_POST['id'], PDO::PARAM_STR);
                    $sth->execute();
                }
                break;

                case "del":
                // if ($_POST['captcha'] == $_SESSION['captcha']) {
                    $sth = $dbh->prepare("DELETE FROM monetki WHERE id=:id");
                    $sth->bindParam(':id', $_POST['id'], PDO::PARAM_STR);
                    $sth->execute();
                // }
                break;

            }

        }


    }

    catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }

?>