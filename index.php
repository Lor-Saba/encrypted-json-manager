<!DOCTYPE HTML>
<html>
    <head>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>Manager</title>
        <link rel="icon" href="./src/style/favicon.png">

        <link rel="stylesheet" type="text/css" href="./src/style/main.css">
        <link rel="stylesheet" type="text/css" href="node_modules/jsoneditor/dist/jsoneditor.min.css">
        
        <script type="text/javascript" src="node_modules/jsoneditor/dist/jsoneditor.min.js"></script>
        <script type="text/javascript" src="node_modules/crypto-js/crypto-js.js"></script>
        <script type="text/javascript" src="./src/data/data.js"></script>

    </head>
    <body>

        <div id="auth" data-name="auth-background" data-mode="">
            <div>
                <input data-name="inp-keygen" type="password" placeholder="Keygen">
                <input data-name="inp-keygen" type="password" placeholder="re-Keygen">
            </div>
        </div>

        <div id="toolbar">
            <button data-name="btn-save">Save</button>
            <span class="session-time">60</span>
        </div>

        <div id="jsoneditor"></div>

        <script type="text/javascript" src="./src/script/main.js"></script> 

	</body>
</html>