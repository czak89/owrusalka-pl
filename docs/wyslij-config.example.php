<?php
/* SMTP settings for api/wyslij.php (the form endpoint).

   1. Copy this file as wyslij-config.php and fill in the mailbox the forms
      should send from: the same data as in the WordPress mail plugin.
   2. Upload it to the server, one folder ABOVE the web root (next to the
      folder that holds wp-config.php, not inside it), so it cannot be opened
      from the web. wyslij.php also finds it next to itself, in api/.
   3. Open https://owrusalka.pl/api/wyslij.php: the line must say
      "transport: smtp".

   The filled-in file holds a password: never commit it or send it to anyone. */
return [
    'host' => 'mail.example.com',            // SMTP server name
    'port' => 465,                           // 465 with 'ssl', 587 with 'tls'
    'encryption' => 'ssl',                   // 'ssl', or 'tls' for STARTTLS
    'username' => 'formularz@owrusalka.pl',  // mailbox login
    'password' => '',                        // mailbox password

    // Optional. Sender address, if it differs from the login:
    // 'sender' => 'formularz@owrusalka.pl',
    // Optional. Where the messages go (default: recepcja@owrusalka.pl):
    // 'recipient' => 'recepcja@owrusalka.pl',
    // Last resort, when the server's certificate does not match its name
    // ("smtp: connect" error): the connection stays encrypted, but the server
    // is no longer verified.
    // 'verify_tls' => false,
];
