<!DOCTYPE html>

<html lang="en">
<head>
    <title>Currency Converter</title>
    <meta name="description" content="CENG 311 Inclass Activity 4"/>

	<style>
        body {
            font-family: Arial, sans-serif;
            margin: 0; 
			padding: 0;
            background-color: #f0f0f0;
			background-image: url('calculator.jpg');
        }
		h2 {
			margin: 40px 0 0 70px;
			font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
			font-size: 33px;
		}
		table {
			margin: 50px auto auto 70px; 
		}
		td {
			padding: 5px;
		}
	</style>
</head>

<body>
	<?php

	$conversion_rates = array(
		'FUSD' => array('TUSD' => 1, 'TCAD' => 1.35, 'TEUR' => 0.92),
		'FCAD' => array('TUSD' => 0.74, 'TCAD' => 1, 'TEUR' => 0.68),
		'FEUR' => array('TUSD' => 1.09, 'TCAD' => 1.47, 'TEUR' => 1)
	);

	function convertCurrency($from, $to, $amount, $conversion_rates) {
		$amount = floatval($amount);

		if (isset($conversion_rates[$from]) && isset($conversion_rates[$from][$to])) {
			return $amount * $conversion_rates[$from][$to];
		}
		return "Invalid conversion";
	}


	$amount = isset($_GET['amount']) ? $_GET['amount'] : ''; 

	if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['from_currency']) && isset($_GET['to_currency']) && $amount !== '') {
		$from_currency = $_GET['from_currency'];
		$to_currency = $_GET['to_currency'];

		$result = convertCurrency($from_currency, $to_currency, $amount, $conversion_rates);

		if ($result !== "Invalid conversion") {
			//echo "<p>$amount $from_currency is equal to $result $to_currency</p>";
		} else {
			echo "<p>Error: Invalid conversion. Please check your input.</p>";
		}
	}

	?>

	<h2>Currency Converter</h2>
	<form action = "activity4.php" method="GET">
		<table>
			<tr>
				<td>From:</td>
				<td><input type="text" name="amount" value="<?php echo isset($_GET['amount']) ? $_GET['amount'] : ''; ?>" /></td>
				<td>Currency:</td>
				<td>
					<select name="from_currency">
						<option value="FUSD" <?php if(isset($_GET['from_currency']) && $_GET['from_currency'] == 'FUSD') echo 'selected'; ?>>USD</option>
						<option value="FCAD" <?php if(isset($_GET['from_currency']) && $_GET['from_currency'] == 'FCAD') echo 'selected'; ?>>CAD</option>
						<option value="FEUR" <?php if(isset($_GET['from_currency']) && $_GET['from_currency'] == 'FEUR') echo 'selected'; ?>>EUR</option>
					</select>
				</td>	
			</tr>
			<tr>
				<td>To:</td>
				<td><input type="text" name="result" value="<?php echo isset($result) ? $result : ''; ?>" disabled /></td>
				<td>Currency:</td>
				<td>
					<select name="to_currency">
						<option value="TUSD" <?php if(isset($_GET['to_currency']) && $_GET['to_currency'] == 'TUSD') echo 'selected'; ?>>USD</option>
						<option value="TCAD" <?php if(isset($_GET['to_currency']) && $_GET['to_currency'] == 'TCAD') echo 'selected'; ?>>CAD</option>
						<option value="TEUR" <?php if(isset($_GET['to_currency']) && $_GET['to_currency'] == 'TEUR') echo 'selected'; ?>>EUR</option>
					</select>
				</td>
			</tr>
				<td></td>
				<td></td>
				<td></td>
				<td><input type="submit" value="Convert"/></td>	
			</tr>
		</table>
	</form>		
</body>
</html>