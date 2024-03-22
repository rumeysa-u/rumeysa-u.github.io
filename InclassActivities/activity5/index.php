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
		'Name' => $_POST['name'] ?? '',
		'Username' => $_POST['username'] ?? '',
		'Password' => $_POST['password'] ?? '',
		'Address' => $_POST['address'] ?? '',
		'Country' => $_POST['country'] ?? '',
		'ZIP Code' => $_POST['zip'] ?? '',
		'Email' => $_POST['email'] ?? '',
		'Sex' => $_POST['sex'] ?? '',
		'Languages' => isset($_POST['languages']) ? implode(', ', $_POST['languages']) : '',
		'About' => $_POST['about'] ?? ''
	);

	foreach ($fields as $label => $value) {
		if (empty($value)) {
			$value = 'Not provided';
		}
		echo "<p><strong>$label:</strong> $value</p>";
	}
	?>
</body>
</html>