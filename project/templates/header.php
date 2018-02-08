<!DOCTYPE html>

<html>

    <head>

        <link href="/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="/css/bootstrap-theme.min.css" rel="stylesheet"/>
        <link href="/css/styles.css" rel="stylesheet"/>

        <?php if (isset($title)): ?>
            <title>Launcestonian <?= htmlspecialchars($title) ?></title>
        <?php else: ?>
            <title>Launcestonian</title>
        <?php endif ?>

        <script src="/js/jquery-1.11.1.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/scripts.js"></script>
        <script src="/js/naplan.js"></script>
        <!-- http://www.kryogenix.org/code/browser/sorttable/ -->
        <script src="/js/sorttable.js"></script>

    </head>

    <body>

        <div class="container-fluid">
            <div class="jumbotron">
                <h1>Launcestonian</h1> 
                <p>The Launceston Data Project</p>
            </div>

            <div id="middle">
