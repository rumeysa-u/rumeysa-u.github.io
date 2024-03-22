<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activity 5 - Preview</title>
</head>
<body>
    <?php
    $fields = array(
        'Name' => $_POST['name'] ?? 'Not provided',
        'Username' => $_POST['username'] ?? 'Not provided',
        'Password' => $_POST['password'] ?? 'Not provided',
        'Address' => $_POST['address'] ?? 'Not provided',
        'Country' => $_POST['country'] ?? 'Not provided',
        'ZIP Code' => $_POST['zip'] ?? 'Not provided',
        'Email' => $_POST['email'] ?? 'Not provided',
        'Sex' => $_POST['sex'] ?? 'Not provided',
        'Languages' => isset($_POST['languages']) ? implode(', ', $_POST['languages']) : 'Not provided',
        'About' => $_POST['about'] ?? 'Not provided'
    );

    foreach ($fields as $label => $value) {
        echo "<p><strong>$label:</strong> $value</p>";
    }
    ?>
</body>
</html>